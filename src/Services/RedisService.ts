import { createClient } from 'redis';
import { User } from '../Types/User';
import { Pokemon } from '../Types/Pokemon';

export class RedisService {
  static async createClient() {
    const client = createClient();
    client
      .on('error', (err) => {
        console.log('Error ' + err);
      })
      .connect();

    return client;
  }

  static async set(key: string, value: string) {
    const client = await this.createClient();
    client.set(key, value).then(() => {
      client.disconnect();
    });
  }

  static async get(key: string) {
    const client = await this.createClient();
    const data = await client.get(key);
    client.disconnect();
    return data;
  }
}
