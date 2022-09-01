import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routesIndex from './routes/index'
import routesNavigation from "./routes/Navigation/Index"
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/", routesIndex);
app.use("/", routesNavigation)
app.use(express.static("./src/views/resources"))

app.get('/', (req: Request, res: Response) => {  
      res.redirect("/Home")  
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});