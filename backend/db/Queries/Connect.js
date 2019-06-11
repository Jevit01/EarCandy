const pgp = require("pg-promise")({});
var connectionString =
  process.env.DATABASE_URL + "?ssl=true" || "postgres://localhost/earworm";
const db = pgp(connectionString);

module.exports = { db };
