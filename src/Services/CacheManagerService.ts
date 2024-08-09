export class CacheManager {
  private static pokemonAccessCache: Map<string, number> = new Map();

  static updatePokemon(key: string): number {
    const count = this.pokemonAccessCache.get(key);
    if (count) {
      this.pokemonAccessCache.set(key, count + 1);
    } else {
      this.pokemonAccessCache.set(key, 1);
    }
    return count === undefined ? 1 : count;
  }

  static getPokemonAccessCount(key: string) {
    return this.pokemonAccessCache.get(key);
  }
}
