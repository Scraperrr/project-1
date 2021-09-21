import Search from '../support/ebay-script';

describe('ebay', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Searches for Game Boy', () => {
        Search('Game Boy', './input-files/game-boy.json');
    });

    // it('Searches for Playstation 1', () => {
    //  Search('Playstation', 7);
    // });

    // it('Searches for Playstation 2', () => {
    //  Search('Playstation 2', 8);
    // });
});