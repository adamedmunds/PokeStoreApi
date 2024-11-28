<h1 align="center">PokeStoreApi</h1>

<div align="center">
  🔥🔥🔥
</div>
<div align="center">
  <strong>Api to hold data about pokemon</strong>
</div>
<div align="center">
  What started as a learning project for Redis turned out to be fully fledged application
</div>
<div align="center">
  <sub>Data provided by <a href="https://pokeapi.co/">PokeApi</a></sub>
</div>

<br />

<div align="center">
  Built with ❤️ by
  <a href="https://github.com/adamedmunds">Adam Edmunds</a>
</sub>
</div>

<h2>Table of Contents</h2>

- [Features](#features)
- [Installation](#installation)
- [Features in Progress](#todo-features)

<h2 id="features">Features</h2>

- **Auto Caching** Automatically stores data into Redis and expires when it's not accessed for more than 24 hours.
- Connect to Azure Redis Cache instead of hosting it locally via `.env`

<h2 id="installation">Installation</h2>

Copy and paste the variables in `.env.template` to a `.env` file.

- To use a **locally** hosted Redis database set
  - `REDIS_URL="localhost"`
  - `REDIS_PORT="<your port>"`
- To use **Azure Cache for Redis** set
  - `REDIS_URL="<your cache>.redis.cache.windows.net"`
  - `REDIS_PORT="<your port>"`
  - `REDIS_ENVIRONMENT="azure"`

Docker is required for this project to work. Install `Docker` and then run `docker compose up`.

To run the server, install the packages via `npm install` and then run `npm start`.

<h2 id="todo-features">Features in Progress</h2>

- Provide more in-depth pokemon querying
  - Evolutions
  - Abilities
