/// <reference types="cypress" />

describe('Burger Constructor Page Tests', () => {
    // Selectors for finding html elements
    const selectors = {
        menu: {
            container: '[data-cy=ingredients-menu]',
            ingredient: {
                bun: '[data-cy=bun-ingredient-item]',
                sause: '[data-cy=sause-ingredient-item]',
                main: '[data-cy=main-ingredient-item]'
            }
        },
        constructor: {
            dropZone: '[data-cy=burger-constructor-dropzone]',
            topBun: '[data-cy=bun-top]',
            ingredients: '[data-cy=ingredients]',
            bottomBun: '[data-cy=bun-bottom]',
            submitOrderButton: '[data-cy=submit-order]'
        },
        modals: {
            wrapper: '[data-cy=modal-wrapper]',
            closeButton: '[data-cy=modal-close-button]',
            ingredientDetails: '[data-cy=ingredient-details]',
            orderDetails: '[data-cy=order-details]',
            orderNumber: '[data-cy=order-number]'
        },
        auth: {
            loginForm: '[data-cy=login-form]',
            registerForm: '[data-cy=register-form]',
            goLoginButton: '[data-cy=go-login-button]',
            goRegisterButton: '[data-cy=go-register-button]',
            nameInput: '[data-cy=name-input]',
            emailInput: '[data-cy=email-input]',
            passwordInput: '[data-cy=password-input]',
            submitButton: '[data-cy=submit]',
        }
    };
    const ORDER_NUMBER_TIMEOUT_MS = 30000;

    beforeEach(() => {
        // Visit burger constructor page
        cy.visit('http://localhost:3000/react-burger');
    });

    it('should have constructor empty', () => {
        // Check if top bun is not present in the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.topBun)
            .first()
            .should('not.be.visible');

        // Check if ingredients are not present in the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.ingredients)
            .first()
            .should('not.be.visible');

        // Check if bottom bun is not present in the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.bottomBun)
            .first()
            .should('not.be.visible');
    });

    it('should allow an ingredient to be dragged into the constructor', () => {
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.main).first()
            .trigger('dragstart')
            .get(selectors.constructor.dropZone)
            .trigger('drop');

        // Check if ingredient is added to the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.ingredients)
            .first()
            .should('be.visible');
    });

    it('should allow a bun to be dragged into the constructor', () => {
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.bun).first()
            .trigger('dragstart')
            .get(selectors.constructor.dropZone)
            .trigger('drop');

        // Check if top bun is added to the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.topBun)
            .first()
            .should('be.visible');

        // Check if bottom bun is added to the constructor
        cy.get(selectors.constructor.dropZone)
            .find(selectors.constructor.bottomBun)
            .first()
            .should('be.visible');
    });

    it('should open and close ingredient details modal', () => {
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.main).first()
            .click()
            .get(selectors.modals.wrapper)
            .find(selectors.modals.ingredientDetails)
            .should('be.visible')
            .get(selectors.modals.wrapper)
            .find(selectors.modals.closeButton)
            .should('be.visible')
            .click()
            .get(selectors.modals.wrapper)
            .should('not.exist');
    });

    it('should register, log in, and create order', () => {
        // Add bun to the constructor
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.bun).first()
            .trigger('dragstart')
            .get(selectors.constructor.dropZone)
            .trigger('drop');

        // Add ingredient to the constructor
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.main).first()
            .trigger('dragstart')
            .get(selectors.constructor.dropZone)
            .trigger('drop');

        // Add second ingredient to the constructor
        cy.get(selectors.menu.container)
            .find(selectors.menu.ingredient.main).first()
            .trigger('dragstart')
            .get(selectors.constructor.dropZone)
            .trigger('drop');
        
        // Sumbit order
        cy.get(selectors.constructor.submitOrderButton)
            .should('be.enabled')
            .click();

        // User isn't logged in - auth form must be present
        cy.get(selectors.auth.loginForm)
            .should('be.visible')
            .find(selectors.auth.goRegisterButton)
            .should('be.visible')
            .click();

        // As user don't have account, he must be able to go to register form and create one
        cy.get(selectors.auth.registerForm)
            .should('be.visible');
        cy.get(selectors.auth.registerForm)
            .find(selectors.auth.nameInput)
            .should('be.visible')
            .type('example');
        cy.get(selectors.auth.registerForm)
            .find(selectors.auth.emailInput)
            .should('be.visible')
            .type('example@example.com');
        cy.get(selectors.auth.registerForm)
            .find(selectors.auth.passwordInput)
            .should('be.visible')
            .type('example');
        cy.get(selectors.auth.registerForm)
            .find(selectors.auth.submitButton)
            .should('be.visible')
            .click();

        // Go to login form after registration
        cy.get(selectors.auth.goLoginButton)
            .should('be.visible')
            .click();

        // Login form must be present
        cy.get(selectors.auth.loginForm)
            .should('be.visible');
        cy.get(selectors.auth.loginForm)
            .find(selectors.auth.emailInput)
            .should('be.visible')
            .type('example@example.com');
        cy.get(selectors.auth.loginForm)
            .find(selectors.auth.passwordInput)
            .should('be.visible')
            .type('example');
        cy.get(selectors.auth.loginForm).find(selectors.auth.submitButton)
            .should('be.visible')
            .click();

        // Constructor page must be present
        cy.get(selectors.menu.container)
            .should('be.visible');
        cy.get(selectors.constructor.dropZone)
            .should('be.visible');

        // Constructor must keep user's order after registration and login
        cy.get(selectors.constructor.topBun)
            .should('be.visible');
        cy.get(selectors.constructor.ingredients)
            .should('be.visible');
        cy.get(selectors.constructor.bottomBun)
            .should('be.visible');

        // Sumbit order
        cy.get(selectors.constructor.submitOrderButton)
            .should('be.enabled')
            .click();

        // Order info must be present
        cy.get(selectors.modals.wrapper)
            .find(selectors.modals.orderDetails)
            .should('be.visible')
            .find(selectors.modals.orderNumber, { timeout: ORDER_NUMBER_TIMEOUT_MS })
            .should('be.visible');

        // User must be able to close order info window by clicking a button
        cy.get(selectors.modals.wrapper)
            .find(selectors.modals.closeButton)
            .should('be.visible')
            .click()
            .get(selectors.modals.wrapper)
            .should('not.exist');
    });
});
