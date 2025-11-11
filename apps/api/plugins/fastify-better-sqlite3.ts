/**
 * Adapted from https://github.com/punkish/fastify-better-sqlite3/blob/main/index.js
 */
import Sqlite3Database from "better-sqlite3";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    betterSqlite3: Sqlite3Database.Database;
  }

  interface FastifyReply {
    betterSqlite3: Sqlite3Database.Database;
  }
}

type BetterSqlite3PluginOptions = {
  pathToDb?: string;
  connection?: Sqlite3Database.Database;
  betterSqlite3Options?: Sqlite3Database.Options;
};

function createDbConnection(
  options: BetterSqlite3PluginOptions,
): Sqlite3Database.Database {
  // If path to db exists, use that, else create a db in memory
  const file = options.pathToDb ? options.pathToDb : ":memory:";
  const betterSqlite3Opts = options.betterSqlite3Options ?? {};
  return new Sqlite3Database(file, betterSqlite3Opts);
}

const fastifyBetterSqlite3PluginCallback: FastifyPluginCallback<
  BetterSqlite3PluginOptions
> = (fastify, options, done) => {
  const db = options.connection ?? createDbConnection(options);

  fastify.decorateRequest("betterSqlite3", {
    getter() {
      return db;
    },
  });
  fastify.addHook("onClose", (_fastify, done) => {
    db.close();
    done();
  });

  done();
};

export default fp(fastifyBetterSqlite3PluginCallback, {
  fastify: "5.x",
  name: "fastify-better-sqlite3",
});
