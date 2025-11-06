import Postgrator from 'postgrator';
import fs from 'fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';

const dbPath = path.join(process.cwd(), "data.db");
const migrationsDir = path.join(process.cwd(), "migrations");

async function migrate() {
  console.log('[scripts/init-db/migrate] going to migrate database');
  const postgrator = new Postgrator({
    migrationPattern: path.join(migrationsDir, "*.sql"),
    driver: 'sqlite3',
    database: dbPath,
  });

  try {
    const applied = await postgrator.migrate();
    console.log('[scripts/init-db/migrate] Applied migrations:', applied);
  } catch (err) {
    console.error('[scripts/init-db/migrate] Migration failed', err);
    process.exit(1);
  }
}

async function loadFixtures() {
  console.log('[scripts/init-db/loadFixtures] loading fixtures into database');

  const db = new sqlite3.Database(dbPath);
  const fixtures = JSON.parse(fs.readFileSync('./data/fixtures.json', 'utf8'));

  db.serialize(() => {
    db.run("BEGIN");

    // insert websites
    fixtures.websites.forEach((website) => {
      db.run(
        `INSERT INTO websites (id, domain)
        VALUES (?, ?)
        ON CONFLICT(id) DO NOTHING`, website.id, website.domain
      );
    });

    fixtures.users.forEach(() => {
      db.run()
    });

    db.run("COMMIT");
  });

  db.close();
}

async function main() {
  const command = process.argv.slice(2)[0];
  if (!command) {
    console.log(
      `Usage: node scripts/db.js <all|migrate|fixtures>

        all: run migrate & fixtures

        migrate: initialize & migrate database with migrations in ./migrations/ directory

        fixtures: load initial fixture located at scripts/data/fixtures.json
      `)
    process.exit(0);
  }

  switch (command) {
    case 'migrate': {
      await migrate();
      break;
    }
    case 'fixtures': {
      await loadFixtures();
      break;
    }
    case 'all': {
      await migrate();
      await loadFixtures();
      break;
    }
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('[scripts/init-db] An error occurred:', err);
  process.exit(1);
});

