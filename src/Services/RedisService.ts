import { createClient } from 'redis';
import { Pokemon } from '../Types/Pokemon';
import { CacheManager } from './CacheManagerService';

export class RedisService {
  public static REDIS_ACCESS_COUNT = 4; // Number of times a pokemon is accessed before it is added to Redis

  static async loadData(): Promise<void> {
    const client = await this.createClient();
    const keys = await client.keys('pokemon:*');
    if (keys.length === 0) {
      console.log(`[${this.name}] No data found in Redis`);
      return;
    }
    for (const key of keys) {
      const data = await client.get(key);
      if (data) {
        CacheManager.addPokemonToList(JSON.parse(data));
        CacheManager.setPokemonAccessCount(key.split(':')[1]);
      }
    }
  }

  static async createClient() {
    const client = createClient();
    client
      .on('error', (err) => {
        console.log('Error ' + err);
      })
      .connect();

    return client;
  }

  static async set(key: string, value: string): Promise<void> {
    const client = await this.createClient();
    client.set(key, value).then(() => {
      client.disconnect();
    });
  }

  static async get(key: string): Promise<string | null> {
    const client = await this.createClient();
    const data = await client.get(key);
    client.disconnect();
    return data;
  }

  static async addPokemon(key: string, value: Pokemon): Promise<void> {
    const client = await this.createClient();
    client.set(key, JSON.stringify(value)).then(() => {
      client.disconnect();
    });
  }

  static async getPokemon(key: string): Promise<Pokemon | null> {
    const client = await this.createClient();
    const data = await client.get(key);
    if (data === null) {
      return null;
    }
    const returnData = JSON.parse(data);
    await client.disconnect();
    return returnData;
  }

  static async getAllPokemonKeys(): Promise<string[]> {
    const client = await this.createClient();
    return await client.keys('pokemon:*');
  }

  static async deletePokemon(key: string): Promise<void> {
    const client = await this.createClient();
    client.del(key).then(() => {
      client.disconnect();
    });
  }
}
