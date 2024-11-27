import { createClient } from 'redis';
import { Pokemon } from '../Types/Pokemon';
import { convertBytes } from '../Utils/convertBytes';

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
