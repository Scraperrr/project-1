function prefilterData(data, gameName) {
    Object.keys(data).forEach(key => data[key].includes('Vendidos  ') || data[key].includes('Sold  ') ? delete data[key] : {});
    Object.keys(data).forEach(key => {
        if (data[key].includes('desde ')) {
            data['from'] = data[key]
            data['from'] = data['from'].replace('desde ', '')
            delete data[key]
        }
    })
    Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
    Object.keys(data).forEach(key => data[key] === '' ? delete data[key] : {});
    if (data['0']) {
        data['adName'] = data['0']
        delete data['0']
    }
    if (data['1']) {
        data['1'] = data['1'].replace('"', '')
        data['1'] = data['1'].replace(',', '.')
        data['1'] = data['1'].replace(' EUR', '')
        data['price'] = parseFloat(data['1'])
        delete data['1']
    }
    if (data['2']) {
        data['2'] = data['2'].replace(',', '.')
        data['2'] = data['2'].replace(/\+/g, '')
        data['2'] = data['2'].replace(' EUR de envío', '')
        data['2'] = data['2'].replace(' estimado', '')
        data['2'] = data['2'].replace('Envío no especificado', '0')
        data['2'] = data['2'].replace('Envío gratis', '0')
        data['2'] = data['2'].replace('Envío internacional gratis', '0')
        data['sendingPrice'] = parseFloat(data['2'])
        delete data['2']
    }
    data['gameName'] = gameName
    delete data['3']
    return data
}

module.exports = {
    prefilterData
}