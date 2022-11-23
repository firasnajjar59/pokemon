/** @format */
// import axios
const axios = require('axios');
// file system
const fs = require('fs');
// variable to store all pokemon/copy
const pokecopy = [];
// variable to store all pokemon
let pokemonsArr = [];

// function to fetch
const fetchFunction = url => axios.get(url);
// fetch More Info About Pokemon
const fetchMoreInfoAboutPoke = async item => {
  try {
    let data = await fetchFunction(item.url);
    // eslint-disable-next-line prefer-destructuring
    data = data.data;
    let poke = {};
    poke = {
      id: data.id,
      stats: data.stats,
      weight: data.weight,
      height: data.height,
      name: data.name,
      types: data.types,
      abilities: data.abilities,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    };
    pokecopy.push(JSON.parse(JSON.stringify(poke)));
  } catch (err) {
    console.log(err.data);
  }
};

// fetch
const fetchingPokes = async () => {
  try {
    console.log('start fetching...');
    // fetch all pokemon
    const res = await fetchFunction(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1200'
    );
    console.log('all pokemons fetched');
    pokemonsArr = [...res.data.results];
    console.log('build pokemon arr');
    // eslint-disable-next-line no-restricted-syntax
    for (const poke of pokemonsArr) {
      // eslint-disable-next-line no-await-in-loop
      await fetchMoreInfoAboutPoke(poke);
    }
    console.log('added all the extra info to pokemons');
    pokemonsArr = JSON.parse(JSON.stringify(pokecopy));
    console.log(pokemonsArr);
    const content = JSON.stringify(pokemonsArr);
    fs.writeFileSync('./data/data.json', content, err => console.log(err));
    console.log('all done!');
    return pokemonsArr;
  } catch (err) {
    console.log(err);
  }
};

fetchingPokes();
// module.exports = pokemonsArr;
