import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getAllUser, getUserById } from './controllers/userControllers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  //res.send('testeando que ande');
  res.send(getAllUser(1,2));
  console.log(getAllUser(1,2));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
