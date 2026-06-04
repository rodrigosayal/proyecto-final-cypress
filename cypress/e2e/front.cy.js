import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageCart = require('../support/page_objects/pageCart')
const pageWishlist = require('../support/page_objects/pageWishlist')

describe('Casos de prueba de FRONT', () => {

  

 it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);

    // Accion paso 1
    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)

    // Accion paso 2: Agregar libro
    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0');
    pageHome.clickAddToCartButton();

    // Respuesta del sistema paso 2
    cy.contains('One Item added to cart').should('be.visible');
    componentNav.validationNumberCartBadge('1');

    // Accion paso 3: Ir al carrito
    cy.get('mat-icon').contains('shopping_cart').click();

    // Paso 4: Validar carrito y avanzar
    pageCart.verifyBookInCart('Harry Potter and the Chamber of Secrets');
    pageCart.clickCheckoutButton();

    // Paso 5: Resumen de orden, rellenar datos y finalizar la compra
    pageCart.verifyOrderSummary('Harry Potter and the Chamber of Secrets');
    
    // Llamamos a la nueva función con los datos correspondientes
    //pageCart.fillShippingAddress('Juan', 'Av. Independencia 2057', 'Av. Congreso 5965', '123456', 'Buenos Aires');
    
    cy.fillShippingAddress(user.name, user.address1, user.address2, user.pincode, user.state)

    pageCart.clickPlaceOrderButton();

    // Paso 7: Validación final en el historial de órdenes
    pageCart.verifyOrderInTable();

  }) 

  it.only('Agregar libro al wishlist, vaciar la lista y regresar al home | Ignacio Martin', () => {
    cy.deleteWishlistAPI(user.userId, user.name, user.password);

    cy.visit(url.login);
    cy.login(user.name, user.password);

    cy.addBookToWishlistAndCheckVisible('1')

    componentNav.goToWishlist();

    pageWishlist.verifyWishlistUrl();

    pageWishlist.clickClearWishlistButton();
    pageWishlist.verifyEmptyWishlistMessage();
    componentNav.validationNumberWishlistBadge('0');

    pageWishlist.clickContinueShoppingButton();

    cy.url().should('eq', url.home);
    pageHome.isBookVisible();
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