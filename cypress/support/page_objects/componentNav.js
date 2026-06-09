class componentNav {

    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible');
    }

    validationNumberWishlistBadge(cant) {
        cy.get('[id^="mat-badge-content-"]').contains(cant).should('be.visible');
    }

    goToWishlist() {
        cy.get('app-nav-bar').within(() => {
            cy.get('mat-icon').contains('favorite').click();
        });
    }

    goToShoppingCart() {
        cy.get('mat-icon').contains('shopping_cart').click();
    }

} module.exports = new componentNav();