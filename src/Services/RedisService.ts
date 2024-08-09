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

  static async addPokemon(key: string, value: Pokemon) {
    const client = await this.createClient();
    client.set(key, JSON.stringify(value)).then(() => {
      client.disconnect();
    });
  }

  static async getPokemon(key: string): Promise<Pokemon> {
    const client = await this.createClient();
    const data = await client.get(key);
    if (data === null) {
      throw new Error(`Pokemon data with key: ${key} doesn't exist`)
    }
    const returnData = JSON.parse(data);
    await client.disconnect();
    return returnData;
  }
}
