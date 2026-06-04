const pageLogin = require('../support/page_objects/pageLogin')
const pageCart = require('../support/page_objects/pageCart')
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();
})


Cypress.Commands.add('fillShippingForm', (name, address1, address2, pincode, state) => {
    pageCart.fillShippingName(name)

    pageCart.fillShippingAddress1(address1)

    pageCart.fillShippingAddress2(address2)

    pageCart.fillShippingPincode(pincode)

    pageCart.fillShippingState(state)
})


Cypress.Commands.add('deleteCartAPI', (userId) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/shoppingcart/${userId}`,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: ''
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})


Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {

    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false, 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token,
        },
        body:
        {
            "orderDetails": [
                {
                    "book": {
                        "bookId": 3,
                        "title": "Harry Potter and the Prisoner of Azkaban",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 213,
                        "coverFileName": "c63ade52-3f90-41fa-980a-1136b6ad2128HP3.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 213
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })

})

Cypress.Commands.add('deleteWishlistAPI', (userId, username, password) => {
    // 1. Hacemos un POST al login de la API para obtener el Token de acceso
    cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/login',
        body: {
            username: username,
            password: password
        }
    }).then((loginResponse) => {
        // Extraemos el token que devuelve el backend
        const token = loginResponse.body.token;

        // 2. Ahora sí ejecutamos el DELETE enviando el Token en los headers
        cy.request({
            method: 'DELETE',
            url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
            failOnStatusCode: false,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                // Enviamos el Bearer Token obligatorio para el 401
                authorization: `Bearer ${token}`
            }
        }).then((deleteResponse) => {
            expect(deleteResponse.status).to.be.oneOf([200, 204, 404]);
        });
    });
});

Cypress.Commands.add('postLoginAPI', (username, password, codeResponse) => {
    cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/login',
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: {
            username: username,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
});

Cypress.Commands.add('verifyOrderHistoryDetails', (bookTitle, quantity, totalPrice) => {
    pageCart.verifyMyOrdersUrl();
    pageCart.clickMostRecentOrderRow();
    pageCart.verifyOrderDetailContainersVisible();
    pageCart.verifyBookTitleInDetails(bookTitle);
    pageCart.verifyBookQuantityInDetails(quantity);
    pageCart.verifyOrderTotalInDetails(totalPrice);
});

Cypress.Commands.add('addBookToWishlistAndCheckVisible', (amount) => {
    pageHome.addFirstBookToWishlist();
    pageHome.verifyAddedToWishlistMessage();
    componentNav.validationNumberWishlistBadge(amount);
})

Cypress.Commands.add('deleteBookFromWishlistAndCheckVisible', (amount) => {
    pageWishlist.clickClearWishlistButton();
    pageWishlist.verifyEmptyWishlistMessage();
    componentNav.validationNumberWishlistBadge(amount);
})