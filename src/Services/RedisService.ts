import { DefaultAzureCredential } from '@azure/identity';
import { createClient } from 'redis';
import { Pokemon } from '../Types/Pokemon';
import { convertBytes } from '../Utils/convertBytes';

export class RedisService {
  static async createClient() {
    let client;
    const redisUrl = `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;

    if (process.env.REDIS_ENVIRONMENT === 'azure') {
      const credential = new DefaultAzureCredential();

      // Fetch a Microsoft Entra token to be used for authentication. This token will be used as the password.
      const accessToken = await credential.getToken(
        'https://redis.azure.com/.default'
      );

      client = createClient({
        username: process.env.AZURE_ACCOUNT_ID,
        password: accessToken.token,
        url: redisUrl,
        pingInterval: 100000,
        socket: {
          tls: true,
          keepAlive: 0,
        },
      });
    } else {
      client = createClient({
        url: redisUrl,
      });
    }

    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    return client;
  }

  static async set(key: string, value: string): Promise<void> {
    const client = await this.createClient();
    await client.set(key, value);
    await client.expire(key, 60 * 60 * 24); // 24 hours until expire
    await client.disconnect();
  }

  static async get(key: string): Promise<string | null> {
    const client = await this.createClient();
    const data = await client.get(key);
    await client.expire(key, 60 * 60 * 24); // 24 hours until expire
    await client.disconnect();
    return data;
  }

  static async addPokemon(key: string, value: Pokemon): Promise<void> {
    const client = await this.createClient();
    await client.set(key, JSON.stringify(value));
    await client.expire(key, 60 * 60 * 24); // 24 hours until expire
    await client.disconnect();
  }

  static async getPokemon(key: string): Promise<Pokemon | null> {
    const client = await this.createClient();
    const data = await client.get(key);
    if (data === null) {
      return null;
    }
    const returnData = JSON.parse(data);
    await client.expire(key, 60 * 60 * 24); // 24 hours until expire
    await client.disconnect();
    return returnData;
  }

  static async getAllPokemonKeys(): Promise<string[]> {
    const client = await this.createClient();
    return await client.keys('pokemon:*');
  }

  static async deletePokemon(key: string): Promise<void> {
    const client = await this.createClient();
    await client.del(key);
    await client.disconnect();
  }

  static async checkPokemonMemory(pokemonId: number): Promise<void> {
    const client = await this.createClient();
    await client.MEMORY_USAGE(`pokemon:${pokemonId}`).then((data) => {
      if (data) {
        console.log(
          `[${this.name}] Pokemon with id ${pokemonId} is using ${convertBytes(
            data
          )} (${data} bytes) of memory`
        );
      }
    });
    await client.disconnect();
  }
}
