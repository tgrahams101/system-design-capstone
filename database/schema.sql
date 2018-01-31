DROP DATABASE IF EXISTS movies;
CREATE DATABASE movies;

\c movies;

CREATE Table movies (
  id SERIAL PRIMARY KEY,
  movie_id INTEGER,
  title VARCHAR(255),
  category VARCHAR (100),
  description VARCHAR(255),
  length VARCHAR(5),
  year SMALLINT,
  director VARCHAR(35),
  critical_acclaim BOOLEAN,
  language VARCHAR(10),
  thumbnail_url VARCHAR(150)
);

INSERT INTO movies (title, category, description, length, year, director, critical_acclaim, language, thumbnail_url) VALUES ('Black Panther', 'action', 'His return to Wakanda', '2:01', 2018, 'Ryan Coogler', true, 'en', 'https://pmcvariety.files.wordpress.com/2017/07/black-panther.jpg')
