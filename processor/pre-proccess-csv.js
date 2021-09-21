const fs = require('fs')
const csv = require('csv-parser');
const {
    guessItemType
} = require('./item-type');
const {
    saveGameIfNeeded, isGameAlreadyStored
} = require('./game-saver');
const {
    prefilterData
} = require('./pre-filter-data');
const {
    makeSureIsGB
} = require('./check-platform');

function preProcessCsv(path, gameName, platform, date) {
    let results = []
    if (fs.lstatSync(path).isDirectory()) {
        return;
    }
    return fs.createReadStream(path)
        .pipe(csv({
            separator: ';',
            headers: false,
        }))
        .on('data', async (data) => {
            if (makeSureIsGB(data)) {
                const prefilteredData = prefilterData(data, gameName) //Eliminar textos, formatear precios, añadir nombre del juego...
                prefilteredData['itemType'] = guessItemType(prefilteredData['adName']) //Clasificar item 
                // TODO: CALCULAR EL PRECIO MEDIO, MEDIANO, ETC DE CADA JUEGO Y GUARDARLO EN BBDD, EN LUGAR DE GUARDAR LA INFO DE CADA CSV.
                const isStored = await isGameAlreadyStored(prefilteredData['adName'], gameName)
                if(!isStored) await saveGameIfNeeded(prefilteredData, gameName, date, platform)
            }
        })
        // .on('end', async () => {
        //     console.log('terminado!')
        // });
}

module.exports = {
    preProcessCsv
}