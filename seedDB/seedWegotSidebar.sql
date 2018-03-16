CREATE DATABASE wegotsidebar;

CREATE TABLE places(
  place_id INT NOT NULL,


  PRIMARY KEY (place_id),
  UNIQUE (place_id)
);

CREATE TABLE openhours (
	period_id INT NOT NULL AUTO_INCREMENT,
	place_id INT NOT NULL REFERENCES places (place_id),
	openday INT NOT NULL,
	opentime INT NOT NULL,
	closeday INT NOT NULL,
	closetime INT NOT NULL,

	PRIMARY KEY (period_id),
	UNIQUE(period_id)
);