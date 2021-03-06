## Usage
#### Setup database
    CREATE USER test_user WITH PASSWORD 'password123';
    CREATE DATABASE shopping;
    CREATE DATABASE shopping_test;
    GRANT ALL PRIVILEGES ON DATABASE shopping TO test_user;
    GRANT ALL PRIVILEGES ON DATABASE shopping_test TO test_user;
#### Setup environment
    Create a .env file
    Put these lines into it and fill it with required data
        POSTGRES_HOST=127.0.0.1
        POSTGRES_DB=shopping
        POSTGRES_TEST_DB=shopping_test
        POSTGRES_USER=test_user
        POSTGRES_PASSWORD=password123

        SALT_ROUNDS=10
        BCRYPT_PASSWORD=this-is-pepper

        TOKEN_SECRET=this-is-jws-secret

    If you want to run tests, put this extra line to .env file
        ENV=test
#### Create databases
    Create shopping databases
        db-migrate up
#### Start server
    npm run watch
    Settings:
        host: 127.0.0.1
        port: 5000
        url base: http://127.0.0.1:5000/store_front
#### Samples
    Create user
        [post] http://127.0.0.1:5000/store_front/users
    Get users
        [Get] http://127.0.0.1:5000/store_front/users
    Create product
        [post] http://127.0.0.1:5000/store_front/products
    Get products
        [Get] http://127.0.0.1:5000/store_front/products
#### Run test
    Not necessary to setup test db environment before run test, build, miration up and down inculeded in test scripts
    Run test with jasmine
        npm run test
    Run test with jasmine-ts
        npm run test-ts


## Notes to myself
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
3. create migration tables
    - npm install db-migrate -g
    - npm install db-migrate-pg -g
    - create migrations folder next to src folder
    - db-migrate create <table name> --sql-file
    - create sql commands to *-down.sql/*-up.sql files
    - db-migrate up
    - db-migrate down
