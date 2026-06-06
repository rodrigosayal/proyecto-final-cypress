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

    it.skip('Titulo caso de prueba API 2 | Nombre Alumno', () => {
    })

    it.skip('Titulo caso de prueba API 3 | Nombre Alumno', () => {
    })

    it.skip('Titulo caso de prueba API 2 | Nombre Alumno', () => {
    })

    it.skip('Titulo caso de prueba API 3 | Nombre Alumno', () => {
    })


})