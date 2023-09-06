#!/bin/bash

# Link to test database
POSTGRES_DB=$(jq -r '.PG_URI' ./server/secrets/secrets.json)

# Drops all tables from database
echo "Dropping tables..."
psql -d "$POSTGRES_DB" -f ./server/db/testData/dropTables.sql
echo "Done dropping tables"
# Rebuilds all tables in database
echo "Building tables..."
psql -d "$POSTGRES_DB" -f ./server/db/buildDB.sql
echo "Done building tables"
# Uploads all of the test data into database
echo "Importing test data..."
psql -d "$POSTGRES_DB" -f ./server/db/testData/buildTestData.sql
echo "Done importing test data"
echo "Finished successfully"
