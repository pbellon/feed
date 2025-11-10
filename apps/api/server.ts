// https://fastify.dev/docs/latest/Reference/TypeScript/
import { Type, type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import {
  WebsiteSchema,
  type FeedEvent,
  type Website,
  FeedEventStatus,
  FeedEventType,
  FeedEventsQuerySchema,
  type PaginationData,
  ApiErrorReplySchema,
  FeedEventSubject,
} from "@feed/types";
import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyBetterSqlite3Plugin from "./plugins/fastify-better-sqlite3.js";
import { ApiFeedEventsReplySchema, ErrorCode } from "./types.js";
import { getColumnFromFeedSortableColumn, getSortOrder } from "./utils.js";

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
    const websites: Website[] = [];
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
server.get(
  "/websites/:websiteId",
  {
    schema: {
      params: Type.Object({ websiteId: Type.Integer() }),
      response: {
        200: WebsiteSchema,
        404: ApiErrorReplySchema,
      },
    },
  },
  (request, reply) => {
    const { websiteId } = request.params;
    const stmt = request.betterSqlite3.prepare(
      "SELECT * FROM websites WHERE id = ?"
    );
    const res = stmt.get(websiteId) as Website | null;
    if (!res) {
      reply.code(404).send({
        code: ErrorCode.WEBSITE_NOT_FOUND,
        message: `Website with '${websiteId}' id not found`,
        statusCode: 404,
      });
      return;
    }
    return res;
  }
);

const DEFAULT_PAGE_SIZE = 10;

server.get(
  "/websites/:websiteId/events",
  {
    schema: {
      params: Type.Object({ websiteId: Type.Integer() }),
      querystring: FeedEventsQuerySchema,
      response: ApiFeedEventsReplySchema,
    },
  },
  (request) => {
    const {
      status,
      page = 0,
      pageSize = DEFAULT_PAGE_SIZE,
      endDate,
      startDate,
      subject,
      sortBy,
      sortOrder,
    } = request.query;
    const websiteId = request.params.websiteId;

    // Initialize filters
    const filters: [string, unknown[]][] = [];
    const params: unknown[] = [websiteId]; // Start with websiteId

    // Add filters based on query parameters
    if (status) {
      filters.push(["event_status = ?", [status]]);
    }

    if (subject) {
      filters.push(["event_subject = ?", [subject]]);
    }

    // convert both date string to datetime string
    const startDateTime = startDate ? `${startDate}T00:00:00` : undefined;
    const endDateTime = endDate ? `${endDate}T23:59:59` : undefined;

    if (startDate && endDate) {
      filters.push([
        "created_at BETWEEN ? AND ?",
        [startDateTime, endDateTime],
      ]);
    } else if (startDate) {
      filters.push(["created_at >= ?", [startDateTime]]);
    } else if (endDate) {
      filters.push(["created_at <= ?", [endDateTime]]);
    }

    // Build the WHERE clause
    const whereClause = filters.map(([condition]) => condition).join(" AND ");
    const whereParams = filters.flatMap(([, values]) => values);

    // Pagination
    const offset = page * pageSize;
    const paginationQuery = `LIMIT ? OFFSET ?`;
    params.push(...whereParams, pageSize, offset);

    let orderBy = "created_at";
    let order = "DESC";

    if (sortBy && sortOrder) {
      orderBy = getColumnFromFeedSortableColumn(sortBy);
      order = getSortOrder(sortOrder);
    }

    // Final query with JOIN to include user details
    const query = `
      SELECT events.id, events.event_status AS status, events.description,
        events.event_subject as subject, events.created_at AS createdAt, 
        events.updated_at as updatedAt, events.information,
        events.event_type AS type, users.id AS userId,
        users.fullname AS userFullName
      FROM events
      JOIN users ON events.user_id = users.id
      WHERE website_id = ? ${whereClause ? `AND ${whereClause}` : ""}
      ORDER BY ${orderBy} ${order}
      ${paginationQuery}
    `;

    // Execute query
    const stmt = request.betterSqlite3.prepare(query);
    const rows = stmt.all(...params) as Array<{
      id: number;
      status: string;
      type: string;
      description: string;
      subject: string;
      createdAt: string;
      updatedAt: string | null;
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

    const events: FeedEvent[] = rows.map((row) => {
      const res: FeedEvent = {
        id: row.id,
        description: row.description,
        status: row.status as FeedEventStatus,
        createdAt: row.createdAt,
        type: row.type as FeedEventType,
        subject: row.subject as FeedEventSubject,
        information: row.information ? JSON.parse(row.information) : undefined,
        user: {
          id: row.userId,
          fullName: row.userFullName,
        },
      };

      if (row.updatedAt) {
        res.updatedAt = row.updatedAt;
      }

      return res;
    });

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
