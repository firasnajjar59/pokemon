/** @format */

// const Poke = require('../models/poke.model');

exports.randomFive = (req, res, next) => {
  req.query.page = `${Math.ceil(Math.random() * 230)}`;
  req.query.limit = '5';
  next();
};