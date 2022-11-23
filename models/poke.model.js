/** @format */

// mongoose
const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  name: String,
  url: String,
});
const schema = new mongoose.Schema({
  id: Number,
  weight: Number,
  height: Number,
  name: {
    type: String,
    unique: true,
    require: true,
  },
  types: [
    {
      type: { type: subSchema },
      slot: Number,
    },
  ],
  stats: [
    {
      base_stat: Number,
      effort: Number,
      stat: { name: String, url: String },
    },
  ],
  abilities: [
    {
      ability: {
        name: String,
        url: String,
      },
      is_hidden: {
        type: Boolean,
        default: false,
      },
      slot: Number,
    },
  ],
  img: String,
});
module.exports = mongoose.model('Poke', schema);
