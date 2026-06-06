import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageCart = require('../support/page_objects/pageCart')
const pageWishlist = require('../support/page_objects/pageWishlist')

describe('Casos de prueba de FRONT', () => {

  

 it('Comprar carrito exitosamente y visualizar orden de compra', () => {

    cy.deleteCartAPI(user.userId);

    cy.visit(url.login)
    cy.login(user.name, user.password);
    cy.url().should('include', url.home)

    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0');
    pageHome.clickAddToCartButton();

    pageHome.verifySuccessAddToCartMessage(); 
    componentNav.validationNumberCartBadge('1');

    componentNav.goToShoppingCart();

    pageCart.verifyBookInCart('Harry Potter and the Chamber of Secrets');
    
    pageCart.clickCheckoutButton(); 

    pageCart.verifyOrderSummary('Harry Potter and the Chamber of Secrets');
    
    cy.fillShippingForm(user.name, user.address1, user.address2, user.pincode, user.state);

    pageCart.clickPlaceOrderButton();

    cy.verifyOrderHistoryDetails('Harry Potter and the Chamber of Secrets', '1', '₹236.00');

  })

  it.only('Agregar libro al wishlist, vaciar la lista y regresar al home | Ignacio Martin', () => {
    cy.deleteWishlistAPI(user.userId, user.name, user.password);

    cy.visit(url.login);
    cy.login(user.name, user.password);

    cy.addBookToWishlistAndCheckVisible('1')

    componentNav.goToWishlist();

    pageWishlist.verifyWishlistUrl();

    cy.deleteBookFromWishlistAndCheckVisible('0')

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