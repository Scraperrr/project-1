const cron = require('node-cron');
const express = require('express');
const dateFormat = require('dateformat');
const fs = require('fs')
const csv = require('csv-parser')
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const Game = require('./game-model');

app = express();

try {
    console.log('connecting to database...')
    mongoose.connect(process.env.MONGO_URI);
    console.log('connected!')
} catch (error) {
    console.log(error)
}


// cron.schedule('* * * * *', async () => {
try {
    const timestamp = Date.now();
    const date = dateFormat(timestamp, 'dd-mm-yyyy');
    const outputFiles = fs.opendirSync('./output-files/')
    let platforms = undefined
    let games = undefined

    while ((platforms = outputFiles.readSync()) !== null) {
        if (platforms.name[0] !== '.') {
            const platformFiles = fs.opendirSync(`./output-files/${platforms.name}`)
            while ((games = platformFiles.readSync()) !== null) {
                const files = fs.readdirSync(`./output-files/${platforms.name}/${games.name}`);
                files.forEach(async file => {
                    if (file.includes(date)) {
                        results = await processCsv(`./output-files/${platforms.name}/${games.name}/${date}.csv`, games.name, date)
                    }
                });
            }
            platformFiles.closeSync()
        }
    }
    outputFiles.closeSync()
} catch (error) {
    console.log(error)
}
// });

async function processCsv(path, gameName, date) {
    let results = []
    return fs.createReadStream(path)
        .pipe(csv({
            separator: ';',
            headers: false
        }))
        .on('data', (data) => {
            let keys = Object.keys(data)
            delete data[keys[keys.length - 1]]
            keys = Object.keys(data)
            for (let key in keys) {
                if (data[key].includes('Vendidos  ') || data[key].includes('Sold  '))
                    delete data[key]
            }
            data['temp'] = data['3']
            keys = Object.keys(data)
            data['3'] = gameName
            data[keys.length] = data['temp']
            delete data['temp']
            keys = Object.keys(data)
            data[keys.length] = guessItemType(data['0'])

            results.push(data)
        })
        .on('end', () => {
            results.forEach(result => {
                Game.findOne({
                    adName: result['0']
                }).then((foundGame) => {
                    if (!foundGame) {
                        const keys = Object.keys(result)
                        const game = new Game({
                            adName: result['0'],
                            soldPrice: result['1'],
                            sendingPrice: result['2'],
                            name: result['3'],
                            sentFrom: result['4'],
                            addedDate: date,
                            itemType: result[keys.length-1]
                        })
                        game.save()
                            .then(() => {
                                console.log(`${result['0']} price info stored`);
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                    } else {
                        console.log(`${result['0']} already processed, skipping`)
                    }
                })
            })
        });
}

function guessItemType(desc) {
    if(desc === undefined) return 'UNKWOWN'

    const sealedConditions = ['Sealed', 'sellado', 'cerrado', 'precintado', 'brand new', 'sin estrenar', 'a estrenar']
    const cibConditions = ['Completo', 'completo en caja', 'cib', 'complete in box', 'in box', 'with box and manual', 'en el embalaje']
    const boxAndManual = ['only box and manual', 'box and instruction', 'box and booklet', 'caja y manual', 'solo caja y manual']
    const boxAndGame = ['caja y juego', 'box and game', 'box and cartridge', 'no manual', 'sin manual', 'sin instrucciones', 'no instruction', 'no instruction booklet']
    const manualAndGame = ['manual y juego', 'game and instruction', 'game and booklet', 'game and instruction booklet']
    const onlyBox = ['box only', 'solo caja', 'caja', 'sin juego', 'no juego', 'juego no incluido', 'no game', 'no cartridge', 'sin carro', 'game not included']
    const onlyManual = ['manual', 'instruction booklet', 'booklet', 'instruction', 'only']
    const repro = ['repro', 'reproduction', 'reproducción', 'not original']

    const isSealed = sealedConditions.some(el => desc.includes(el))
    const isCib = cibConditions.some(el => desc.includes(el))
    const isBoxAndManual = boxAndManual.some(el => desc.includes(el))
    const isBoxAndGame = boxAndGame.some(el => desc.includes(el))
    const isManualAndGame = manualAndGame.some(el => desc.includes(el))
    const isOnlyBox = onlyBox.some(el => desc.includes(el))
    const isOnlyManual = onlyManual.some(el => desc.includes(el))
    const isRepro = repro.some(el => desc.includes(el))
    const isOnlyGame = !isSealed && !isCib && !isBoxAndGame && !isBoxAndManual && !isManualAndGame && !isOnlyBox && !isOnlyManual && !isRepro

    if(isSealed) return 'SEALED'
    if(isCib) return 'CIB'
    if(isBoxAndManual) return 'BOX_AND_MANUAL'
    if(isBoxAndGame) return 'BOX_AND_GAME'
    if(isManualAndGame) return 'MANUAL_AND_GAME'
    if(isOnlyBox) return 'BOX'
    if(isOnlyManual) return 'MANUAL'
    if(isRepro) return 'REPRO'
    return 'GAME'

}

app.listen(3000);