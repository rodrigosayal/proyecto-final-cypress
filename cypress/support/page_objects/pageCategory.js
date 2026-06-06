class pageCategory {

    clickCategory(category) {
        cy.contains(category).click()
    }

    verifyBooksVisible() {
        cy.get('app-book-card').should('have.length.greaterThan', 0)
    }

} module.exports = new pageCategory();