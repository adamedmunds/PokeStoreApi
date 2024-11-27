import { RedisService } from './RedisService';

export class CacheManager {
  static async deletePokemon(pokemonId: number): Promise<void> {
    await RedisService.deletePokemon(`pokemon:${pokemonId}`);
  }
}
