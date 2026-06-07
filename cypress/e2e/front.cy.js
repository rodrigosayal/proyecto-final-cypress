import user from '../fixtures/user.json'
import url from '../fixtures/url.json'
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageCart = require('../support/page_objects/pageCart')
const pageWishlist = require('../support/page_objects/pageWishlist')
const pageCategory = require('../support/page_objects/pageCategory')

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

  it('Agregar libro al wishlist, vaciar la lista y regresar al home | Ignacio Martin', () => {
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

   it('Filtrar libros por categoría Drama | Rodrigo Sayal', () => {
    cy.visit(url.login)
    cy.login(user.name, user.password)
    cy.url().should('include', url.home)

    pageCategory.clickCategory('Drama');

    pageCategory.verifyBooksVisible();
})

it('Prueba de botones + y - en el carrito  | Franco Nicolas Meza', () => {
    cy.deleteCartAPI(user.userId);

    cy.visit(url.login);
    cy.login(user.name, user.password);

    pageHome.isBookVisible();
    componentNav.validationNumberCartBadge('0');
    pageHome.clickAddToCartButton();

    pageHome.verifySuccessAddToCartMessage(); 
    componentNav.validationNumberCartBadge('1');

    componentNav.goToShoppingCart();

    pageCart.verifyBookInCart('Harry Potter and the Chamber of Secrets');

    cy.increaseItemQuantity();
    //pageCart.addCircleButton();
    //pageCart.verifySuccessAdd();
    //pageCart.matColumnQualityVisible(2);

    pageCart.removeCircleButton();
    pageCart.verifySuccessRemoved();
    pageCart.matColumnQualityVisible(1);

  })

  it('Titulo caso de prueba 5 | Nombre Alumno', () => {
  })

  //it.only ejecutar solo ese caso de prueba
  //it.skip no ejecuta ese caso de prueba
  
})