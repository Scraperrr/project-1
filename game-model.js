const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    adName: String,
    soldPrice: String,
    sendingPrice: String,
    sentFrom: {type: String, default: 'España'},
    name: String,
    addedDate: String,
    itemType: String
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game