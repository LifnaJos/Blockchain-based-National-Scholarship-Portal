import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "isp_official",
    password: "0713",
    port: 5432,
});

db.connect();

export default db;