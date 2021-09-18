import Search from '../support/ebay-script';

describe('ebay', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    it('Searches for Game Boy Color', () => {
        Search('Game Boy Color', './input-files/game-boy-color.json', 0, 1097);
    });

    // it('Searches for Playstation 1', () => {
    //  Search('Playstation', 7);
    // });

    // it('Searches for Playstation 2', () => {
    //  Search('Playstation 2', 8);
    // });
});