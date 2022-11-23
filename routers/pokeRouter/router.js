/** @format */

const express = require('express');

const router = express.Router();
// immport controller
const pokeController = require('../../controller/function');
// import middlewares
const pokemiddlewares = require('../../middleware/poke.middleware');

router.route('/pokemon').get(pokeController.getPokemons);
router.route('/pokemon/:id').get(pokeController.getPokemon);
router
  .route('/randomFive')
  .get(pokemiddlewares.randomFive, pokeController.getPokemons);
module.exports = router;
