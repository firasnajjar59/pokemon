/** @format */

const Poke = require('../models/poke.model');
const APIFEeatures = require('../utiltes/APIFeatures');

exports.getPokemons = async (req, res) => {
  try {
    // build query
    const features = new APIFEeatures(Poke.find(), req.query)
      .filter()
      .sort()
      .fieldsLimit()
      .pagination();
    // execute query
    const pokemonArr = await features.query;

    res.json({
      next: `http://localhost:8181/api/v1/pokemon?page=${
        req.query.page + 1 || 2
      }&limit=${req.query.limit || 20}`,
      prev: `http://localhost:8181/api/v1/pokemon?page=${
        req.query.page - 1 || 1
      }&limit=${req.query.limit || 20}`,
      pokes: pokemonArr.length,
      pokemonArr,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getPokemon = async (req, res) => {
  const pokemonArr = await Poke.findById(req.params.id);
  res.json({
    pokemonArr,
  });
};
