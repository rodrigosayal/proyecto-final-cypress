class pageCart {

    // --- PASO 4: Carrito y Checkout ---
    verifyBookInCart(bookTitle) {
        cy.get('td').contains(bookTitle).should('be.visible');
    }

    clickCheckoutButton() {
        cy.get('.mdc-button__label').contains('CheckOut').click();
    }

    // --- PASO 5: Confirmación de Orden / Datos de Envío ---
    verifyOrderSummary(bookTitle) {
        cy.get('mat-card-title').contains('Order Summary').should('be.visible');
        cy.get('td').contains(bookTitle).should('be.visible');
    }

    // NUEVO MÉTODO: Rellena los datos obligatorios del formulario

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

    // --- PASO 6 y 7: Éxito y Tabla de Órdenes ---
    verifyOrderSuccessMessage() {
        cy.contains('Order placed successfully!!!').should('be.visible');
    }

    verifyOrderSuccessMessage() {
        cy.contains('Order placed successfully!!!').should('be.visible');
    }

    // 1. Valida la redirección correcta
    verifyMyOrdersUrl() {
        cy.url().should('include', '/myorders');
    }

    // 2. Ejecuta la acción de expandir la orden más reciente
    clickMostRecentOrderRow() {
        cy.get('tr.mat-mdc-row').first().click();
    }

    // 3. Valida que los contenedores del detalle se desplieguen correctamente
    verifyOrderDetailContainersVisible() {
        cy.get('mat-card.mat-mdc-card').first().should('be.visible');
        cy.get('table.details-table').first().should('be.visible');
    }

    // 4. Valida los elementos específicos de la compra usando un contenedor común
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