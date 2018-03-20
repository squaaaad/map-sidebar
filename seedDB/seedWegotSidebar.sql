-- run with: psql -d postgres -a -f seedWegotSidebar.sql

--SETUP SYSTEM for large file load, see; https://www.postgresql.org/docs/current/static/populate.html
ALTER SYSTEM SET max_wal_size = 4;
-- increase max_wal_size: The default settings are 5 minutes and 1 GB, respectively (aws t2 micro has 1, aws t2 small has 2)


DROP DATABASE IF EXISTS wegotsidebar;

CREATE DATABASE wegotsidebar;

\c wegotsidebar;

CREATE TABLE places(
  -- place_id,name,formatted_address,international_phone_number,website,url,open_now,open_periods,weekday_text,lat,lon
  place_id VARCHAR(10) NOT NULL,
  name VARCHAR NOT NULL,
  formatted_address VARCHAR(100) NOT NULL,
  international_phone_number VARCHAR(30),
  website TEXT,
  url TEXT,
  open_now BOOLEAN NOT NULL DEFAULT FALSE,
  -- open_periods jsonb,
  -- weekday_text VARCHAR,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL

);

-- DROP TABLE openhours;

CREATE TABLE openhours (
	place_id VARCHAR(10) NOT NULL, 
	openday INT NOT NULL,
	opentime INT NOT NULL,
	closeday INT NOT NULL,
	closetime INT NOT NULL,
  weekday_text VARCHAR(30) NOT NULL

);

COPY places FROM '/Users/slangbro/Code/HackReactor/map-sidebar/seedDB/fakerPlacesNoPeriods.csv' WITH DELIMITER ',' CSV HEADER;

COPY openhours(place_id, openday, opentime, closeday, closetime, weekday_text) FROM '/Users/slangbro/Code/HackReactor/map-sidebar/seedDB/fakerOpenHours.csv' WITH DELIMITER ',' CSV HEADER;
  
-- add index/keys to places
ALTER TABLE places ADD PRIMARY KEY(place_id);
ALTER TABLE places ADD UNIQUE (place_id);

--add keys to openhours
ALTER TABLE openhours ADD period_id SERIAL PRIMARY KEY;
ALTER TABLE openhours ADD FOREIGN KEY(place_id) REFERENCES places (place_id);

--create index to optimize primary key lookup and join
CREATE INDEX placesToOpenHours ON openhours (place_id);
--create index to optimiz ordering open periods by day
CREATE INDEX openHoursOrdered ON openhours (openday);


ANALYZE places;
ANALYZE openhours;

-- reset system 
ALTER SYSTEM RESET wal_level;