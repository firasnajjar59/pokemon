/** @format */
//import express
const express = require('express');
// import morgan
const morgan = require('morgan');
// file system
const fs = require('fs');
// mongooze
const mongoose = require('mongoose');
// router
const routerPokemon = require('./routers/pokeRouter/router');
// import cors
const cors = require('cors');

// inherit express function to app variable
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/v1', routerPokemon);
module.exports = app;
