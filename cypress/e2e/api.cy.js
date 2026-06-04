import user from '../fixtures/user.json'

describe('Casos de prueba de APIs', () => {

    it('API | Comprar carrito exitosamente', () => {
        cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/login',
            body: {
                username: user.name,
                password: user.password
            }
        }).then((loginResponse) => {
            const tokenValido = loginResponse.body.token;

            cy.postCheckOutAPI(user.userId, tokenValido, 200);
        });
    });

    it('API | Error al comprar carrito sin token', () => {

        cy.request({
            method: 'POST',
            url: 'https://app.bookdbqa.online/api/CheckOut/1058',
            failOnStatusCode: false, 
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: '',
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
      expect(response.status).to.eq(401)})

    })

    it.skip('Validar inicio de sesión exitosamente API 1 | Ignacio Martin', () => {
        cy.postLoginAPI(user.name, user.password, 200);
    })

    it.skip('Validar intento de inicio de sesión fallido con contraseña incorrecta API 2 | Ignacio Martin', () => {
        cy.postLoginAPI(user.name, 'ContrasenaInvalida123', 401);
    })

    it.skip('Titulo caso de prueba API 2 | Nombre Alumno', () => {
    })

    it.skip('Titulo caso de prueba API 3 | Nombre Alumno', () => {
    })


})