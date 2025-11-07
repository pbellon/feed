// https://fastify.dev/docs/latest/Reference/TypeScript/
import { Type, type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { EventSchema, WebsiteSchema, type Website } from "@feed/types";
import Fastify from "fastify";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyBetterSqlite3Plugin from "./plugins/fastify-better-sqlite3.js";
import { EventsQuerystringSchema } from "./types.js";

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
  (request, reply) => {
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
  "/events",
  {
    schema: {
      querystring: EventsQuerystringSchema,
      response: {
        200: Type.Array(EventSchema),
      },
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
    console.log({ status, page, pageSize, endDate, startDate, type });
  }
);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
