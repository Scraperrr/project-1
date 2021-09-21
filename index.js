const cron = require('node-cron');
const express = require('express');
const dateFormat = require('dateformat');
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const { preProcessCsv } = require('./processor/pre-proccess-csv');

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
                    // if (file.includes('20-09-2021')) {
                        preProcessCsv(`./output-files/${platforms.name}/${games.name}/${file}`, games.name, platforms.name, file.replace('.csv', ''))
                    // }
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

app.listen(3000);