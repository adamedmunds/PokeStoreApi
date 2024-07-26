import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { pokemonRouter, userRouter } from './Controllers';
import { initalizeDatabase } from './ORM';

dotenv.config();
const app: Express = express();

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/pokemon', pokemonRouter);

app.listen(3000, async () => {
  await initalizeDatabase();
  console.log(`[server]: Server is running at http://localhost:3000`);
});
