CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullname TEXT NOT NULL
);

CREATE TABLE websites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domain TEXT NOT NULL
)

CREATE TABLE events (
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
    'UPLOAD',
  ))

  event_status TEXT NOT NULL CHECK (event_status IN ('COMPLETED','FAILED','IN_PROGRESS'))

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
  ))


  created_at TEXT NOT NULL,

  -- arbitrary JSON, needs valid JSON string and parsing when querying if not null
  information TEXT,

  -- incomplete mapping, should create dedicated table
  project_id INTEGER,

  -- not sure if deserve a dedicated table
  application_id TEXT,
)

