const mongoose = require('mongoose')
const GameSchema = require('./game-model')

function getCollectionNameFromGameName(gameName) {
    let collectionName = gameName.replace(/[^\w\s]/gi, '')
    return collectionName.charAt(0).toLowerCase()
}

async function saveGameIfNeeded(processedGame, gameName, date, platform) {
    let collectionName = getCollectionNameFromGameName(gameName)
    const Game = mongoose.model(collectionName, GameSchema);
    
    const game = new Game({
        adName: processedGame['adName'],
        soldPrice: processedGame['price'],
        sendingPrice: processedGame['sendingPrice'],
        name: processedGame['gameName'],
        sentFrom: processedGame['from'],
        addedDate: date,
        itemType: processedGame['itemType'],
        platform
    })
    game.save()
        .then(() => {
            console.log(`${processedGame['adName']} price info stored`);
        })
        .catch((error) => {
            console.log(error)
        });


}

async function updateLastDate(processedGame, gameName, date, platform) {
    let collectionName = getCollectionNameFromGameName(gameName)
    const Game = mongoose.model(collectionName, GameSchema);
    
    const storedGame = await Game.findOne({
        adName: adName
    })

    storedGame.lastUpdate = date

    storedGame.save()
        .then(() => {
            console.log(`${processedGame['adName']} price info updated`);
        })
        .catch((error) => {
            console.log(error)
        });


}

async function isGameAlreadyStored(adName, gameName) {
    let collectionName = getCollectionNameFromGameName(gameName)
    const Game = mongoose.model(collectionName, GameSchema);
    const isGameStored = await Game.findOne({
        adName: adName
    })
    return isGameStored ? true : false
}

module.exports = {
    saveGameIfNeeded,
    isGameAlreadyStored,
    updateLastDate
}