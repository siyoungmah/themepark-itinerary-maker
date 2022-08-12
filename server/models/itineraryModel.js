const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  userID: { 
    type: Schema.Types.ObjectId, 
    required: true,
    ref: 'user'},
  itineraryObject: {type: Object, required: true},
});

const Itinerary = mongoose.model('itinerary', itinerarySchema);

module.exports = Itinerary;