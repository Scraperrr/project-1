function guessItemType(desc) {
    if (desc === undefined) return 'UNKNOWN'

    const sealedConditions = ['Never open', 'Sealed', 'sellado', 'cerrado', 'precintado', 'brand new', 'sin estrenar', 'a estrenar']
    const cibConditions = ['boxed', 'embalaje original', 'en caja completa','completa', 'Completo', 'completo en caja', 'cib', 'complete in box', 'in box', 'with box and manual', 'en el embalaje', 'en caja']
    const boxAndManual = ['only box and manual', 'box and instruction', 'box and booklet', 'caja y manual', 'solo caja y manual']
    const boxAndGame = ['caja y juego', 'box and game', 'box and cartridge', 'no manual', 'sin manual', 'sin instrucciones', 'no instruction', 'no instruction booklet']
    const manualAndGame = ['con manuale', 'manual y juego', 'game and instruction', 'game and booklet', 'game and instruction booklet']
    const onlyBox = ['box only', 'solo caja', 'caja', 'sin juego', 'no juego', 'juego no incluido', 'no game', 'no cartridge', 'sin carro', 'game not included']
    const onlyManual = ['manual', 'instruction booklet', 'booklet', 'instruction', 'only']
    const repro = ['repro', 'reproduction', 'reproducción', 'not original']

    const isSealed = sealedConditions.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isCib = cibConditions.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isBoxAndManual = boxAndManual.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isBoxAndGame = boxAndGame.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isManualAndGame = manualAndGame.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isOnlyBox = onlyBox.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isOnlyManual = onlyManual.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isRepro = repro.some(el => desc.toLowerCase().includes(el.toLowerCase()))
    const isOnlyGame = !isSealed && !isCib && !isBoxAndGame && !isBoxAndManual && !isManualAndGame && !isOnlyBox && !isOnlyManual && !isRepro

    if (isRepro) return 'REPRO'
    if (isOnlyBox) return 'BOX'
    if (isSealed) return 'SEALED'
    if (isCib) return 'CIB'
    if (isBoxAndManual) return 'BOX_AND_MANUAL'
    if (isBoxAndGame) return 'BOX_AND_GAME'
    if (isManualAndGame) return 'MANUAL_AND_GAME'
    if (isOnlyManual) return 'MANUAL'
    return 'GAME'
}
module.exports = { guessItemType } 