import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Sqlite3Database from "better-sqlite3";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const apiRootDir = path.join(scriptsDir, "..");
const sqliteDbPath = path.join(apiRootDir, "data.db");

/**
 * Create initial database structure
 */
function init(db: Sqlite3Database.Database) {
  try {
    const createTables = db.transaction(() => {
      db.prepare(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullname TEXT NOT NULL
        )`,
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS websites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          domain TEXT NOT NULL
        )`,
      ).run();

      db.prepare(
        `CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
          website_id INTEGER REFERENCES websites(id) ON DELETE CASCADE,
          event_type TEXT NOT NULL CHECK (event_type IN (
            'ADD',
            'CREATE',
            'DELETE',
            'DUPLICATE',
            'FLUSH_CACHE',
            'INSTALL',
            'OPTIMIZE',
            'PLUG',
            'RENEWAL',
            'TRIGGER',
            'UNPLUG',
            'UPDATE',
            'UPLOAD'
          )),

          event_status TEXT NOT NULL CHECK (event_status IN ('COMPLETED','FAILED','IN_PROGRESS')),

          event_subject TEXT NOT NULL CHECK (event_subject IN (
              'APPLICATION',
              'CACHE',
              'CERTIFICATE',
              'CONFIG',
              'DNS',
              'JOB',
              'OPTIMIZATION',
              'PLUG',
              'TARGET',
              'USER'
          )),

          description TEXT,
          support_ticket TEXT,
          request_id TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT,

          -- arbitrary JSON, needs valid JSON string and parsing when querying if not null
          information TEXT,

          -- incomplete mapping, should create dedicated table
          project_id INTEGER,
          application_id TEXT
      )`,
      ).run();
    });

    createTables();
    console.log("[scripts/db/init] Done, database properly set up");
  } catch (error) {
    console.error("[scripts/db/init] An error occurred:", error);
  }
}

/**
 * Load fixtures from scripts/data/fixtures into sqlite3 database
 */
function loadFixtures(db: Sqlite3Database.Database) {
  try {
    console.log("[scripts/db/loadFixtures] loading fixtures into database");

    const fixturePath = path.join(scriptsDir, "data", "fixtures.json");
    const fixtures = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

    const insertWebsite = db.prepare(
      `INSERT INTO websites (id, domain)
      VALUES (?, ?)
      ON CONFLICT(id) DO NOTHING`,
    );

    const insertUser = db.prepare(
      `INSERT INTO users (id, fullname)
      VALUES (?, ?)
      ON CONFLICT(id) DO NOTHING`,
    );

    const insertEvent = db.prepare(
      `INSERT INTO events (
        id, user_id, website_id, event_type, event_status, event_subject,
        description, support_ticket, request_id, created_at, updated_at,
        information, project_id, application_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      ) ON CONFLICT(id) DO NOTHING`,
    );

    const insertFixtures = db.transaction(() => {
      fixtures.websites.forEach((website: { id: number; domain: string }) => {
        insertWebsite.run(website.id, website.domain);
      });

      fixtures.users.forEach((user: { id: number; name: string }) => {
        insertUser.run(user.id, user.name);
      });

      // disabled because we're on the fixture loading script, not in running code
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fixtures.events.forEach((event: any) => {
        insertEvent.run(
          event.id,
          event.userId,
          event.websiteId,
          event.type,
          event.status,
          event.subject,
          event.description,
          event.supportTicket || null,
          event.requestId || null,
          event.createdAt,
          event.updatedAt || null,
          event.information ? JSON.stringify(event.information) : null,
          event.projectId || null,
          event.applicationId || null,
        );
      });
    });

    insertFixtures();

    console.log(
      `[scripts/db/loadFixtures] Done, loaded ${fixtures.users.length} users, ${fixtures.websites.length} websites and ${fixtures.events.length} events`,
    );
  } catch (error) {
    console.error("[scripts/db/loadFixtures] An error occurred:", error);
  }
}

function main() {
  const db = new Sqlite3Database(sqliteDbPath);
  try {
    const command = process.argv.slice(2)[0];
    if (!command) {
      console.log(
        `Usage: node scripts/db.js <all|init|fixtures>

        all: run init & fixtures

        init: initialize & init database with migrations in ./migrations/ directory

        fixtures: load initial fixture located at scripts/data/fixtures.json
      `,
      );
      process.exit(0);
    }

    switch (command) {
      case "init": {
        init(db);
        break;
      }
      case "fixtures": {
        loadFixtures(db);
        break;
      }
      case "all": {
        init(db);
        loadFixtures(db);
        break;
      }
    }
    db.close();
    process.exit(0);
  } catch (err) {
    db.close();
    console.error("[scripts/db] An error occurred:", err);
    process.exit(1);
  }
}

main();
