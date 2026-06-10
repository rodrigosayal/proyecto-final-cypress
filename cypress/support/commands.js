const pageLogin = require('../support/page_objects/pageLogin')
const pageCart = require('../support/page_objects/pageCart')
const pageHome = require('../support/page_objects/pageHome')
const componentNav = require('../support/page_objects/componentNav')
const pageWishlist = require('../support/page_objects/pageWishlist')

Cypress.Commands.add('login', (name, password) => {
    pageLogin.typeUserName(name);
    pageLogin.typeUserPassword(password);
    pageLogin.clickLoginButton();
})
Cypress.Commands.add('increaseItemQuantity', () => {
    pageCart.addCircleButton();
    pageCart.verifySuccessAdd();
    pageCart.matColumnQualityVisible(2);
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

Cypress.Commands.add('loginAPI', (username, password) => {
    return cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/login',
        body: {
            username,
            password
        }
    }).then((response) => {
        return response.body.token;
    });
});


Cypress.Commands.add('postCheckOutAPI', (userId, token, codeResponse) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/CheckOut/${userId}`,
        failOnStatusCode: false, 
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: token ? `Bearer ${token}` : ''
        },
        body: {
            "orderDetails": [
                {
                    "book": {
                        // Cambiamos el 3 por el 2 para alinearlo con el Front
                        "bookId": 2,
                        "title": "Harry Potter and the Chamber of Secrets",
                        "author": "JKR",
                        "category": "Romance",
                        "price": 236,
                        "coverFileName": "9c3132bf-90d5-45ab-8ab1-24896e00199aHP2.jpg"
                    },
                    "quantity": 1
                }
            ],
            "cartTotal": 236
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
});

Cypress.Commands.add('deleteWishlistAPI', (userId, username, password) => {
    cy.request({
        method: 'POST',
        url: 'https://app.bookdbqa.online/api/login',
        body: {
            username: username,
            password: password
        }
    }).then((loginResponse) => {
        const token = loginResponse.body.token;

        cy.request({
            method: 'DELETE',
            url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
            failOnStatusCode: false,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
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
    // 1. Validamos que la URL sea la correcta (/myorders)
    pageCart.verifyMyOrdersUrl();
    
    // 2. Esperamos explícitamente a que aparezca al menos una fila en el listado de órdenes.
    // Esto le da margen a la aplicación para renderizar la tabla inicial tras el cambio de página.
    cy.get('tr.mat-mdc-row', { timeout: 10000 }).should('be.visible');
    
    // 3. Hacemos clic en la orden más reciente para expandir el detalle
    pageCart.clickMostRecentOrderRow();
    
    // 4. Verificamos que los contenedores del detalle se muestren estructuralmente
    pageCart.verifyOrderDetailContainersVisible();
    
    // 5. Ejecutamos las aserciones del contenido interno.
    // Al haber modificado los métodos en pageCart.js con selectores de una sola línea 
    // y timeouts de 10 segundos, Cypress reintentará buscar la tabla completa y su celda 
    // de forma dinámica hasta que los datos impacten en la pantalla.
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

Cypress.Commands.add('getOrdersWithTokenAPI', (userId, username, password, codeResponse) => {
    cy.loginAPI(username, password).then((token) => {
        cy.request({
            method: 'GET',
            url: `https://app.bookdbqa.online/api/Order/${userId}`,
            failOnStatusCode: false,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(codeResponse)
        })
    })
})

Cypress.Commands.add('getOrdersWithoutTokenAPI', (userId, codeResponse) => {
    cy.request({
        method: 'GET',
        url: `https://app.bookdbqa.online/api/Order/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            authorization: ''
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse)
    })
})

Cypress.Commands.add('allDeleteWishlistAPI', (userId, username, password, codeResponse) => { 
    cy.loginAPI(username, password).then((token) => {
        cy.request({
            method: 'DELETE',
            url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
            failOnStatusCode: false,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
        expect(response.status).to.eq(codeResponse)
        })
    })
})

Cypress.Commands.add('deleteWishlistUnauthorizedAPI', (userId, codeResponse) => {
    cy.request({
        method: 'DELETE',
        url: `https://app.bookdbqa.online/api/Wishlist/${userId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            authorization: ''
        } 
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
}); // <-- CORRECCIÓN: Cerramos correctamente este comando aquí

Cypress.Commands.add('toggleWishlistWithTokenAPI', (userId, username, password, bookId, codeResponse) => {
    cy.loginAPI(username, password).then((token) => {
        cy.request({
            method: 'POST',
            url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${bookId}`,
            failOnStatusCode: false,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(codeResponse);
        });
    });
});

Cypress.Commands.add('toggleWishlistWithoutTokenAPI', (userId, bookId, codeResponse) => {
    cy.request({
        method: 'POST',
        url: `https://app.bookdbqa.online/api/Wishlist/ToggleWishlist/${userId}/${bookId}`,
        failOnStatusCode: false,
        headers: {
            accept: 'application/json',
            authorization: ''
        }
    }).then((response) => {
        expect(response.status).to.eq(codeResponse);
    });
});