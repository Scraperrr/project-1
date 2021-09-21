const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    adName: String,
    soldPrice: String,
    sendingPrice: String,
    sentFrom: {type: String, default: 'España'},
    name: String,
    addedDate: String,
    itemType: String,
    platform: String,
    lastUpdate: { type: String, default: '21-09-2021'}
})

// const Game = mongoose.model('Game', gameSchema);

module.exports = GameSchema