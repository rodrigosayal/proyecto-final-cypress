describe('Casos de prueba de FRONT', () => {

  

  it.only('Comprar carrito exitosamente y visualizar orden de compra', () => {

    // Precondicion
    cy.request({
      method: 'DELETE',
      url: 'https://app.bookdbqa.online/api/shoppingcart/1062',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: ''
      },
      body: ''
  }).then((response) => {
      expect(response.status).to.eq(200)})


    cy.visit('https://app.bookdbqa.online/login')
    cy.get('input[formcontrolname="username"]').type('UTest')
    cy.get('input[formcontrolname="password"]').type('Utest123')
    cy.get('app-login button').contains('Login').click()

    //Respuesta del sistema paso 1:
    cy.url().should('include', 'https://app.bookdbqa.online/')
    cy.get('app-book-card').contains('Harry Potter and the Chamber of Secrets').should('be.visible')
    //cy.get('#mat-badge-content-0').contains('0').should('be.visible')

    //Accion paso 2:
    cy.get('button').contains('Add to Cart').click()

    //Respuesta del sistema paso 2:
    cy.contains('One Item added to cart').should('be.visible')
    //cy.get('#mat-badge-content-0').contains('1').should('be.visible')

    //Accion paso 3:
    cy.get('.mdc-icon-button.mat-mdc-icon-button.mat-mdc-button-base.mat-unthemed').contains('shopping_cart').click()

    //Respuesta del sistema paso 3:
    // Asegurar que el cambio de URL se completó
    cy.url().should('include', '/shopping-cart')

    //Acción paso 4:
    cy.get('.mdc-button__label').contains('CheckOut').click()

    //Respuesta del sistema
    cy.url().should('include', 'https://app.bookdbqa.online/checkout')

    // Acción paso 5:
    cy.get('input[formcontrolname="name"]').type('Juan')
    cy.get('input[formcontrolname="addressLine1"]').type('Av. Independencia 2057')
    cy.get('input[formcontrolname="addressLine2"]').type('Av. Congreso 5965')
    cy.get('input[placeholder="Pincode"]').type('123456')
    cy.get('input[formcontrolname="state"]').type('Buenos Aires')

    //Acción paso 6
    cy.get('button[type="submit"]').contains('Place Order').click()

    //Respuesta del sistema
    cy.url().should('include', 'https://app.bookdbqa.online/myorders')

    //Accion paso 7
    cy.get('tr.mat-mdc-row').first().click()

    // Respuesta del sistema - Verificación del detalle de la orden:
    
    // 1. Validamos que el contenedor del detalle de la orden se hizo visible
    cy.get('mat-card.mat-mdc-card').first().should('be.visible')
    
    // 2. Validamos que la primera tabla de detalles esté presente en la pantalla
    cy.get('table.details-table').first().should('be.visible')

    // 3. Agregamos .first() aquí para que .within() trabaje sobre un solo elemento
    cy.get('table.details-table').first().within(() => {
      // Valida que el título del libro sea el correcto
      cy.contains('Harry Potter and the Chamber of Secrets').should('be.visible')
      
      // Valida que la cantidad especificada en el detalle sea 1
      cy.contains('1').should('be.visible')
      
      // Valida que figure el monto pagado correspondiente
      cy.contains('₹236.00').should('be.visible')
    })
  })

  it('Titulo caso de prueba 2 | Nombre Alumno', () => {
  })

  it('Titulo caso de prueba 3 | Nombre Alumno', () => {
  })

  it('Titulo caso de prueba 4 | Nombre Alumno', () => {
  })

  it('Titulo caso de prueba 5 | Nombre Alumno', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})