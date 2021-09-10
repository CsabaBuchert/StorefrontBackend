1. postgres setup on windows
    - download and install: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
    - add psql's bin folder to path enviroment variable
2. create database
    - open command line
    - type: psql -h 127.0.0.1 -U postgres postgres
    - create user
        CREATE USER test_user WITH PASSWORD 'password123';
        CREATE DATABASE shopping;
        CREATE DATABASE shopping_test;
        GRANT ALL PRIVILEGES ON DATABASE shopping TO test_user;
        GRANT ALL PRIVILEGES ON DATABASE shopping_test TO test_user;
    - create database.json
        {
            "dev": {
                "driver": "pg",
                "host": {"ENV": "POSTGRES_HOST"},
                "database": {"ENV": "POSTGRES_DB"},
                "user": {"ENV": "POSTGRES_USER"},
                "password": {"env": "POSTGRES_PASSWORD"}
            },
            "test": {
                "driver": "pg",
                "host": {"ENV": "POSTGRES_HOST"},
                "database": {"ENV": "POSTGRES_TEST_DB"},
                "user": {"ENV": "POSTGRES_USER"},
                "password": {"env": "POSTGRES_PASSWORD"}
            }
        }
    - create .env file, and set enviroment variables
        POSTGRES_HOST = '127.0.0.1'
        POSTGRES_DB = 'storefront'
        POSTGRES_TEST_DB = 'storefront_test'
        POSTGRES_USER = 'test_user'
        POSTGRES_PASSWORD = 'password123'
        ENV=dev
