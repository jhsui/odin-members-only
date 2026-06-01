import express, { urlencoded } from "express";
import { router } from "./routers/router.js";
import { join } from "node:path";

const app = express();
const port = 8080;

const __dirname = import.meta.dirname;
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
