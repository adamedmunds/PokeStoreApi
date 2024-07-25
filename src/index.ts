import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { userRouter } from './Controllers/UserController';

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
