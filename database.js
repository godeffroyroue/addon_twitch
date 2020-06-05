var pg = require('pg');
var conString = "postgres://postgres:password@db/db";
try {
    var client = new pg.Client(conString);
    client.connect();
    module.exports = client;
    console.log("Database connected");
}
catch (e) {
    console.log("Error connection [" + e + "]");
}