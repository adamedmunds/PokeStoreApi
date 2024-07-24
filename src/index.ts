import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { addUser } from './api/users/addUser';
import { getUsers } from './api/users/getUsers';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/api/user/add', async (req: Request, res: Response) => {
  return await addUser(req, res);
});

app.get('/api/users', async (req: Request, res: Response) => {
  let startAt = 0;
  if (req.query.startAt) {
    startAt = +req.query.startAt;
  }
  return await getUsers(startAt, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
