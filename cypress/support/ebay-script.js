const dateFormat = require('dateformat');

const search = (platformName, fileUrl) => {
    const timestamp = Date.now();
    const date = dateFormat(timestamp, 'dd-mm-yyyy');

    cy.visit('https://www.ebay.es/');

    cy.readFile(fileUrl).then((games) => {
        for (const key in games.games) {
                const game = games.games[key]
                const filePath = `./output-files/${platformName}/${game}/${date}.csv`;
                cy.task('fileExists', filePath).then((exists) => {
                    if (!exists) {
                        cy.task('log', `CHECKING ${game}`);
                        const fullCriteria = `${platformName} ${game}`;
                        //search
                        cy.get('#gh-ac').clear().type(fullCriteria, { force: true });
                        cy.get('#gh-btn').click();
                        //filter by country
                        cy.get(
                            '#x-refine__group__4 > .x-refine__main__value > :nth-child(4)',
                        ).click();
                        //filter by sold
                        cy.get(
                            '.x-refine__main__value > [name="LH_Sold"]',
                        ).click();
                        //iterate over the list
                        cy.get('#srp-river-results > ul').each(($list) => {
                            cy.wrap($list).within(() => {
                                if ($list.find('li.s-item').length) {
                                    cy.get('li.s-item').each(($listItem) => {
                                        cy.wrap($listItem).within(() => {
                                            //get the title
                                            cy.get('.s-item__title').then((title) => {
                                                //check if title includes the game
                                                const titleText = title.text();
                                                if (titleText.includes(game)) {
                                                    cy.writeFile(filePath, `${titleText};`, {
                                                        flag: 'a+',
                                                    });
                                                    //get the price
                                                    if ($listItem.find('.s-item__price').length) {
                                                        cy.get('.s-item__price').then((price) => {
                                                            const priceText = price.text();
                                                            cy.writeFile(filePath, `${priceText};`, {
                                                                flag: 'a+',
                                                            });
                                                        });
                                                    }
                                                    //get the shipping cost
                                                    if ($listItem.find('.s-item__shipping').length) {
                                                        cy.get('.s-item__shipping').then((shipping) => {
                                                            const shippingText = shipping.text();
                                                            cy.writeFile(filePath, `${shippingText};`, {
                                                                flag: 'a+',
                                                            });
                                                        });
                                                    }
                                                    //get the selling date
                                                    if ($listItem.find('.s-item__title--tagblock').length) {
                                                        cy.get('.s-item__title--tagblock').then((date) => {
                                                            const dateText = date.text();
                                                            cy.writeFile(filePath, `${dateText};`, {
                                                                flag: 'a+',
                                                            });
                                                        });
                                                    }
                                                    //get location
                                                    if ($listItem.find('.s-item__location').length) {
                                                        cy.get('.s-item__location').then((location) => {
                                                            const locationText = location.text();
                                                            cy.writeFile(filePath, `${locationText};`, {
                                                                flag: 'a+',
                                                            });
                                                        });
                                                    }
                                                    cy.writeFile(filePath, `\n`, { flag: 'a+' });
                                                } else {
                                                    cy.writeFile(
                                                        `./output-files/${platformName}/${game}/${date}.csv`,
                                                        ``,
                                                        { flag: 'a+' },
                                                    );
                                                }
                                            });
                                        });
                                    });
                                } else {
                                    cy.writeFile(
                                        `./output-files/${platformName}/${game}/${date}.csv`,
                                        ``,
                                        { flag: 'a+' },
                                    );
                                }
                            });
                        });
                    }
                });  
        }
            
    });
};

export default search;