class pageWishlist {

    verifyWishlistUrl() {
        cy.url().should('include', '/wishlist');
    }

    clickClearWishlistButton() {
        cy.get('button').contains('Clear Wishlist').click();
    }

    verifyEmptyWishlistMessage() {
        cy.get('mat-card-title').contains('Your wishlist is empty.').should('be.visible');
    }

    clickContinueShoppingButton() {
        cy.get('button').contains('Continue shopping').click();
    }

} module.exports = new pageWishlist();