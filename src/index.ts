import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { cacheRouter, pokemonRouter, userRouter } from './Controllers';
import { initalizeDatabase } from './ORM';
import { RedisService } from './Services';
import { errorHandler } from './middleware';

dotenv.config();
const app: Express = express();

app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/pokemon', pokemonRouter);
app.use('/api/cache', cacheRouter);

app.use(errorHandler);

app.listen(3000, async () => {
  await initalizeDatabase();
  await RedisService.loadData();
  console.log(`[server]: Server is running at http://localhost:3000`);
});
