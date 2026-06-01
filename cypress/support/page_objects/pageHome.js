class pageHome {

    isBookVisible() {
        cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    }

    clickAddToCartButton() {
        cy.get('button').contains('Add to Cart').click()
    }

    addFirstBookToWishlist() {
        cy.get('app-addtowishlist').first().contains('favorite').click();
    }

    verifyAddedToWishlistMessage() {
        cy.contains('Added to Wishlist!!!').should('be.visible');
    }



} module.exports = new pageHome();