const pgp = require("pg-promise")({});
var connectionString =
  process.env.DATABASE_URL || "postgres://localhost/earworm";
const db = pgp(connectionString);

console.log(process.env);

module.exports = { db };
