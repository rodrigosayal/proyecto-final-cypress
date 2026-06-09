class componentNav {

    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible');
    }

    validationNumberWishlistBadge(cant) {
        cy.get('[id^="mat-badge-content-"]').contains(cant).should('be.visible');
    }

    goToWishlist() {
    const iconoFavoritosEnNav = 'app-nav-bar mat-icon';
    cy.get(iconoFavoritosEnNav).contains('favorite').click();
}

    goToShoppingCart() {
        cy.get('mat-icon').contains('shopping_cart').click();
    }

} module.exports = new componentNav();