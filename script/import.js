/** @format */

const dotEnv = require('dotenv');

dotEnv.config({ path: './config.env' });
const mongoose = require('mongoose');
// file system
const fs = require('fs');
const Poke = require('../models/poke.model');
//

// connect data base
let dbUrl = process.env.DATABASE;
dbUrl = dbUrl.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`database connected!`);
  });
const pokemonArr = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

const data = async () => {
  try {
    const res = await Poke.create(pokemonArr);
    console.log(res);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deletedata = async () => {
  try {
    const res = await Poke.deleteMany();
    console.log(res);
    process.exit();
  } catch (err) {
    console.log(err.data);
  }
};
console.log(process.argv[2]);
if (process.argv[2] === '--import') {
  data();
}
if (process.argv[2] === '--delete') {
  deletedata();
}
