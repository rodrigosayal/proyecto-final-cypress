class pageCart {

    verifyBookInCart(bookTitle) {
        cy.get('td').contains(bookTitle).should('be.visible');
    }

    clickCheckoutButton() {
        cy.get('.mdc-button__label').contains('CheckOut').click();
    }

    verifyOrderSummary(bookTitle) {
        cy.get('mat-card-title').contains('Order Summary').should('be.visible');
        cy.get('td').contains(bookTitle).should('be.visible');
    }

    fillShippingName(name) {
        cy.get('input[formcontrolname="name"]').type(name);
    }

    fillShippingAddress1(address1) {
        cy.get('input[formcontrolname="addressLine1"]').type(address1);
    }

    fillShippingAddress2(address2) {
        cy.get('input[formcontrolname="addressLine2"]').type(address2);
    }

    fillShippingPincode(pincode) {
        cy.get('input[placeholder="Pincode"]').type(pincode);
    }

    fillShippingState(state) {
        cy.get('input[formcontrolname="state"]').type(state);
    }

    clickPlaceOrderButton() {
        cy.get('button').contains('Place Order').click();
    }

    verifyOrderSuccessMessage() {
        cy.contains('Order placed successfully!!!').should('be.visible');
    }

    verifyOrderSuccessMessage() {
        cy.contains('Order placed successfully!!!').should('be.visible');
    }

    verifyMyOrdersUrl() {
        cy.url().should('include', '/myorders');
    }

    clickMostRecentOrderRow() {
        cy.get('tr.mat-mdc-row').first().click();
    }

    verifyOrderDetailContainersVisible() {
        cy.get('mat-card.mat-mdc-card').first().should('be.visible');
        cy.get('table.details-table').first().should('be.visible');
    }

    verifyBookTitleInDetails(bookTitle) {
        cy.get('table.details-table').first().within(() => {
            cy.contains(bookTitle).should('be.visible');
        });
    }

    verifyBookQuantityInDetails(quantity) {
        cy.get('table.details-table').first().within(() => {
            cy.contains(quantity).should('be.visible');
        });
    }

    verifyOrderTotalInDetails(totalPrice) {
        cy.get('table.details-table').first().within(() => {
            cy.contains(totalPrice).should('be.visible');
        });
    }

} module.exports = new pageCart();