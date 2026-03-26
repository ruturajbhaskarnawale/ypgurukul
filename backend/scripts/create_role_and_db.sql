-- SQL script to create role and database for local development
-- Run as a superuser (e.g., the 'postgres' user)

-- Create role/user
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'ritik') THEN
      CREATE ROLE ritik WITH LOGIN ENCRYPTED PASSWORD 'ritik1811';
   END IF;
END
$$;

-- Create database owned by ritik
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ypgurukul_ritik') THEN
      PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE ypgurukul_ritik OWNER ritik');
   END IF;
END
$$;

-- If dblink isn't available or you prefer plain psql, run these commands instead:
-- CREATE USER ritik WITH ENCRYPTED PASSWORD 'ritik1811';
-- CREATE DATABASE ypgurukul_ritik OWNER ritik;
