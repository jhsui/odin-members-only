import express, { urlencoded } from "express";
import { join } from "node:path";
import { router } from "./routers/router.js";
import expressSession from "express-session";
import pool from "./db/pool.js";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import "./config/passport.js";
import flash from "connect-flash";

const pgSession = connectPgSimple(expressSession);
const app = express();

const __dirname = import.meta.dirname;
// app.use(express.static("public"));
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));

app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),

    secret: process.env.SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log("session:", req.session);
  console.log("user:", req.user);
  next();
});

app.use(flash());

app.use("/", router);

const port = 8080;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
