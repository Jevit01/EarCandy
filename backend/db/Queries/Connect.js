const pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

module.exports = { db };
