import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.loginAPI(user.name, user.password)
            .then((token) => {
                cy.postCheckOutAPI(user.userId, token, 200);
            });
    });

    it('API | Error al comprar carrito sin token', () => {
        cy.postCheckOutAPI(user.userId, '', 401);
    })

    it('Validar inicio de sesión exitosamente API 1 | Ignacio Martin', () => {
        cy.postLoginAPI(user.name, user.password, 200);
    })

    it('Validar intento de inicio de sesión fallido con contraseña incorrecta API 2 | Ignacio Martin', () => {
        cy.postLoginAPI(user.name, 'PAssword123', 401);
    })

    it('Borrar libros de la wishlist con token API 3 | Franco Nicolas Meza', () => {
        cy.allDeleteWishlistAPI(user.userId, user.name, user.password, 200)
        })

    it('Borrar items de la wishlist sin token API 4 | Franco Nicolas Meza', () => {
        cy.deleteWishlistUnauthorizedAPI(user.userId, 401)
    })
   
 it('Obtener historial de órdenes exitosamente API 5 | Rodrigo Sayal', () => {
        cy.getOrdersWithTokenAPI(user.userId, user.name, user.password, 200)
    })

    it('Error al obtener historial de órdenes sin token API 6 | Rodrigo Sayal', () => {
        cy.getOrdersWithoutTokenAPI(user.userId, 401)
    })

    
    it('API | Agregar libro a la wishlist exitosamente API 7 | Cesar Taddey', () => {
    cy.toggleWishlistWithTokenAPI(user.userId, user.name, user.password, 3, 200);
    })

    it('API | Error al agregar libro a la wishlist sin token API 8 | Cesar Taddey', () => {
    cy.toggleWishlistWithoutTokenAPI(user.userId, 3, 401);
    })

})