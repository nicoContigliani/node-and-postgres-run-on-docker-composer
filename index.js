import express from "express";
import cors from "cors";
import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  FRONTEND_URL,
  PORT,
} from "./config.js";
// import { connectionString } from "pg/lib/defaults.js";

const app = express();
// const pool = new pg.Pool({
//   host: DB_HOST,
//   database: DB_DATABASE,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   port: DB_PORT,
// });


const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log(pool,"data poll*******************")


app.use(
  cors(
    //   {
    //   origin: FRONTEND_URL,
    // }
  )
);

app.get("/", async (req, res) => {

  res.send({
    pong: "Si puede!!!",
  });
});



app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");

  res.send({
    pong: result.rows[0].now,
  });
});

app.listen(PORT, () => {
  console.log("server started on port 3000");
});
