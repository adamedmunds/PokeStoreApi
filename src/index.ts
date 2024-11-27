import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { cacheRouter, pokemonRouter } from './Controllers';
import { initalizeDatabase } from './ORM';
import { errorHandler } from './middleware';

dotenv.config();
const app: Express = express();

app.use(bodyParser.json());

app.use('/api/pokemon', pokemonRouter);
app.use('/api/cache', cacheRouter);

app.use(errorHandler);

app.listen(3000, async () => {
  await initalizeDatabase();
  console.log(`[server]: Server is running at http://localhost:3000`);
});
