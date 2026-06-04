class componentNav {

    validationNumberCartBadge(cant) {
        cy.get('#mat-badge-content-0').contains(cant).should('be.visible');
    }

    // NUEVO: Valida la insignia de favoritos (corazón) en la barra superior
    validationNumberWishlistBadge(cant) {
        cy.get('[id^="mat-badge-content-"]').contains(cant).should('be.visible');
    }

    // NUEVO: Hace clic en el corazón de la barra superior para ir a la Wishlist
    goToWishlist() {
        cy.get('app-nav-bar').within(() => {
            cy.get('mat-icon').contains('favorite').click({ force: true });
        });
    }

    goToShoppingCart() {
        cy.get('mat-icon').contains('shopping_cart').click();
    }

} module.exports = new componentNav();