CREATE SCHEMA presto;

CREATE TABLE presto.restaurant (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE presto.item (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES presto.restaurant(id) ON DELETE CASCADE,
  name TEXT,
  price INTEGER DEFAULT 0
);

CREATE TABLE presto.modification (
  id SERIAL PRIMARY KEY,
  source_id INTEGER REFERENCES presto.item(id),
  target_id INTEGER REFERENCES presto.item(id)
);
