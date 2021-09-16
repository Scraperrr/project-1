import Search from '../support/ebay-script';

describe('ebay', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 0, 125);
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 126, 251);
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 252, 376);
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 377, 502);
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 503, 627);
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json', 628, 752);
    });

    it('Searches for Game Boy Color', () => {
        Search('Game Boy Color', './input-files/game-boy-color.json');
    });

    // it('Searches for Playstation 1', () => {
    //  Search('Playstation', 7);
    // });

    // it('Searches for Playstation 2', () => {
    //  Search('Playstation 2', 8);
    // });
});