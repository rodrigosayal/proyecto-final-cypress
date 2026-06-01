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
    fillShippingAddress(name, address1, address2, pincode, state) {
        cy.get('input[formcontrolname="name"]').type(name);
        cy.get('input[formcontrolname="addressLine1"]').type(address1);
        cy.get('input[formcontrolname="addressLine2"]').type(address2);
        cy.get('input[placeholder="Pincode"]').type(pincode);
        cy.get('input[formcontrolname="state"]').type(state);
    }

    clickPlaceOrderButton() {
        cy.get('button').contains('Place Order').click();
    }

    // --- PASO 6 y 7: Éxito y Tabla de Órdenes ---
    verifyOrderSuccessMessage() {
        cy.contains('Order placed successfully!!!').should('be.visible');
    }

    verifyOrderInTable() { // Eliminamos el parámetro userId que no se usa visualmente
        // 1. Validamos que nos encontremos efectivamente en la URL de órdenes
        cy.url().should('include', '/myorders');
        
        // 2. Hacemos clic en la primera fila de la tabla (la orden más reciente)
        cy.get('tr.mat-mdc-row').first().click();

        // 3. Verificamos que los contenedores del detalle de la orden se hagan visibles
        cy.get('mat-card.mat-mdc-card').first().should('be.visible');
        cy.get('table.details-table').first().should('be.visible');

        // 4. Validamos el contenido interno específico del detalle de la compra
        cy.get('table.details-table').first().within(() => {
            cy.contains('Harry Potter and the Chamber of Secrets').should('be.visible');
            cy.contains('1').should('be.visible');
            cy.contains('₹236.00').should('be.visible');
        });
    }

} module.exports = new pageCart();