-- Install Postgresql
    brew install postgresql
    brew services start postgresql

-- Entering psql command prompt
    psql postgres
    Entered as superuser

-- Creating a role
    postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';

-- Alter role for 'me' to create database.
    postgres=# ALTER ROLE me CREATEDB;

 -- Quit
    \q 

-- Connect postgres with 'me'
    psql -d postgres -U me

-- Create database 
    postgres=> CREATE DATABASE habuild;

-- Connect to the database 
    postgres=> \c habuild

-- Create Tables
    CREATE TABLE topics (
        id VARCHAR NOT NULL PRIMARY KEY,
        NAME VARCHAR(40),
        CONSTRAINT name_unique UNIQUE(name)
    );

    CREATE TABLE ratings (
        rid VARCHAR NOT NULL PRIMARY KEY,
        rating INT NOT NULL,
        tid VARCHAR NOT NULL,
        CONSTRAINT fk_ratings_topics FOREIGN KEY(tid) 
        REFERENCES topics(id)
    );

-- Inserting values 
    -- Use POST for creating entries in table.

-- Displaying Data 
    SELECT * FROM topics;
    SELECT * FROM ratings;

