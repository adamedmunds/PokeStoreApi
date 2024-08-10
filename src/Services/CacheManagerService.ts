import { Pokemon } from '../Types/Pokemon';
import { DoublyLinkedList } from '../Utils/DoublyLinkedList';
import { RedisService } from './RedisService';

export class CacheManager {
  private static pokemonAccessCache: Map<string, number> = new Map();
  private static pokemonList = new DoublyLinkedList<Pokemon>();

  static updatePokemon(key: string): number {
    const count = this.pokemonAccessCache.get(key);
    if (count) {
      this.pokemonAccessCache.set(key, count + 1);
    } else {
      this.pokemonAccessCache.set(key, 1);
    }
    return count === undefined ? 1 : count;
  }

  static getPokemonAccessCount(key: string): number | undefined {
    return this.pokemonAccessCache.get(key);
  }

  static setPokemonAccessCount(key: string): void {
    this.pokemonAccessCache.set(key, RedisService.REDIS_ACCESS_COUNT);
  }

  static addPokemonToList(pokemon: Pokemon): void {
    this.pokemonList.insert(pokemon);
  }

  static displayPokemonList(): void {
    this.pokemonList.display();
  }

  static showAccessCache(): void {
    console.log(this.pokemonAccessCache);
  }

  static getIndexOfPokemon(pokemonId: number): number {
    return this.pokemonList.indexOfPokemon(pokemonId);
  }

  static movePokemonToFront(pokemonId: number): void {
    const index = this.getIndexOfPokemon(pokemonId);
    if (index === -1) {
      return;
    }
    const node = this.pokemonList.search(index);
    if (!node) {
      console.log('Pokemon not found in cache list');
      return;
    }
    this.pokemonList.movePokemonToFront(node);
  }

  static async deletePokemon(pokemonId: number): Promise<void> {
    const index = this.getIndexOfPokemon(pokemonId);
    if (index === -1) {
      console.log(`[${this.name}] Pokemon not found in cache list`);
      return;
    }
    const node = this.pokemonList.search(index);
    if (!node) {
      console.log(`[${this.name}] Pokemon not found in cache list`);
      return;
    }
    this.pokemonList.delete(node);
    await RedisService.deletePokemon(`pokemon:${pokemonId}`);
    this.pokemonAccessCache.delete(pokemonId.toString());
  }
}
