import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { findAll } from './controllers/userControllers';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.get('/', (req: Request, res: Response) => {
      
      res.send(findAll());
      console.log(findAll());

});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
