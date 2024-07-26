import { createClient } from 'redis';
import { User } from '../Types/User';

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
    client.get(key).then(() => {
      client.disconnect();
    });
  }

  static async hSet(key: string, value: User) {
    const client = await this.createClient();
    client.hSet(key, value).then(() => {
      client.disconnect();
    });
  }

  static async hGet(key: string) {
    const client = await this.createClient();
    client.hGetAll(key).then(() => {
      client.disconnect();
    });
  }
}
