const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    adName: String,
    soldPrice: String,
    sendingPrice: String,
    sentFrom: {type: String, default: 'España'},
    name: String,
    addedDate: String,
    itemType: String,
    platform: String
})

// const Game = mongoose.model('Game', gameSchema);

module.exports = GameSchema