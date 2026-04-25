import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import routesIndex from "./presentation/routes/index";
import routesNavigation from "./presentation/routes/Navigation/Index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/", routesIndex);
app.use("/", routesNavigation);
app.use(express.static("./src/views/resources"));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/Home");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
