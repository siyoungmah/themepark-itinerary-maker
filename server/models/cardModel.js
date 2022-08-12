const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  location: { type: String, required: true},
  name: { type: String, required: true},
  time: { type: Number, required: true},
  waitTime: { type: Number, required: true},
  itinerary_id: { 
    type: Schema.Types.ObjectId,
    ref: 'itinerary'
  } 
});

const Card = mongoose.model('card', cardSchema);

module.exports = Card;