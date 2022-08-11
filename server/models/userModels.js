const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userNum: { type: Number, required: true, unique: true },
  itinerary_id: { 
    type: Schema.Types.ObjectId,
    ref: 'itinerary'
  } 
});

const User = mongoose.model('user', userSchema);

module.exports = { User };