// https://fastify.dev/docs/latest/Reference/TypeScript/
import { Type, type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  FeedEventSchema,
  WebsiteSchema,
  type FeedEvent,
  type Website,
  FeedEventStatusEnum,
} from "@feed/types";
import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyBetterSqlite3Plugin from "./plugins/fastify-better-sqlite3.js";
import {
  ErrorReplySchema,
  EventsQuerystringSchema,
  EventsReplySchema,
  type PaginationData,
} from "./types.js";

const distDir = path.dirname(fileURLToPath(import.meta.url));
const pathToDb = path.join(distDir, "..", "data.db");

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>();
server.register(fastifyBetterSqlite3Plugin, {
  pathToDb,
});

server.get(
  "/websites",
  {
    schema: {
      response: {
        200: Type.Array(WebsiteSchema),
      },
    },
  },
  (request) => {
    const stmt = request.betterSqlite3.prepare("SELECT * FROM websites");
    let websites: Website[] = [];
    stmt.all().forEach((rawRow) => {
      const row = rawRow as Record<string, string | number>;
      websites.push({
        id: row.id as number,
        domain: row.domain as string,
      });
    });
    return websites;
  }
);

const DEFAULT_PAGE_SIZE = 10;

server.get(
  "/:websiteId/events",
  {
    schema: {
      params: Type.Object({ websiteId: Type.Integer() }),
      querystring: EventsQuerystringSchema,
      response: EventsReplySchema,
    },
  },
  (request, reply) => {
    const {
      status,
      page = 0,
      pageSize = DEFAULT_PAGE_SIZE,
      endDate,
      startDate,
      type,
    } = request.query;
    const websiteId = request.params.websiteId;

    // Initialize filters
    const filters: [string, any[]][] = [];
    const params: any[] = [websiteId]; // Start with websiteId

    // Add filters based on query parameters
    if (status) {
      filters.push(["event_status = ?", [status]]);
    }

    if (type) {
      filters.push(["event_type = ?", [type]]);
    }

    if (startDate && endDate) {
      filters.push(["created_at BETWEEN ? AND ?", [startDate, endDate]]);
    } else if (startDate || endDate) {
      reply.code(400).send({
        code: 400,
        reason: "Bad request",
        message: "Both startDate and endDate must be specified",
      });
      return;
    }

    // Build the WHERE clause
    const whereClause = filters.map(([condition]) => condition).join(" AND ");
    const whereParams = filters.flatMap(([, values]) => values);

    // Pagination
    const offset = page * pageSize;
    const paginationQuery = `LIMIT ? OFFSET ?`;
    params.push(...whereParams, pageSize, offset);

    // Final query with JOIN to include user details
    const query = `
      SELECT events.id, events.event_status AS status, 
        events.created_at AS createdAt, events.updated_at as updatedAt,
        events.information, events.event_type AS type, 
        users.id AS userId, users.fullname AS userFullName
      FROM events
      JOIN users ON events.user_id = users.id
      WHERE website_id = ? ${whereClause ? `AND ${whereClause}` : ""}
      ${paginationQuery}
    `;

    // Execute query
    const stmt = request.betterSqlite3.prepare(query);
    const rows = stmt.all(...params) as Array<{
      id: number;
      status: string;
      type: string;
      createdAt: string;
      information: string | null;
      userId: number;
      userFullName: string;
    }>;

    // Count total events
    const countStmt = request.betterSqlite3.prepare(
      `SELECT COUNT(*) as total FROM events WHERE website_id = ? ${whereClause ? `AND ${whereClause}` : ""}`
    );
    const total = (
      countStmt.get(websiteId, ...whereParams) as { total: number }
    ).total;

    const pagination: PaginationData = {
      total,
      page,
      pageSize,
    };

    if (offset + pageSize < total) {
      pagination.nextPage = page + 1;
    }

    const events: FeedEvent[] = rows.map((row) => ({
      id: row.id,
      status: row.status as FeedEventStatusEnum,
      createdAt: row.createdAt,
      user: {
        id: row.userId,
        fullName: row.userFullName,
      },
    }));

    return {
      pagination,
      events,
    };
  }
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
