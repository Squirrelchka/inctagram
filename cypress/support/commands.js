// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const signUpSelectors = require("../fixtures/pageSignUp/signUpSelectors.json");
const signInSelectors = require("../fixtures/pageSignIn/signInSelectors.json");
const sideBarSelectors = require("../fixtures/sideBarSelectors.json");
const logOutSelectors = require("../fixtures/logOutSelectors.json");

Cypress.Commands.add("checkValidValues", (userName, email, password, passwordConfirmation) => {
    cy.get(signUpSelectors.userNameField).clear().type(userName);
    cy.get(signUpSelectors.emailField).clear().type(email);
    cy.get(signUpSelectors.passwordField).clear().type(password);
    cy.get(signUpSelectors.passwordConfirmationField).clear().type(passwordConfirmation); 
})


Cypress.Commands.add("checkInvalidValuesUsername", (userName, errorMessage) => {
    cy.get(signUpSelectors.userNameField).clear().type(userName);
    cy.get(signUpSelectors.passwordField).click();
    cy.get(signUpSelectors.errorUsernameMessage).should("have.text", errorMessage);
    cy.get(signUpSelectors.userNameField).clear()
  }) 

Cypress.Commands.add("checkInvalidValuesEmail", (email, errorMessage) => {
    cy.get(signUpSelectors.emailField).clear().type(email);
    cy.get(signUpSelectors.passwordField).click();
    cy.get(signUpSelectors.errorEmailMessage).should("have.text", errorMessage);
    cy.get(signUpSelectors.emailField).clear()
})   
Cypress.Commands.add("checkInvalidValuesPassword", (password, errorMessage) => {
  cy.get(signUpSelectors.passwordField).clear().type(password);
  cy.get(signUpSelectors.emailField).click();
  cy.get(signUpSelectors.errorPasswordMessage).should("have.text", errorMessage);
  cy.get(signUpSelectors.passwordField).clear()
})
Cypress.Commands.add("checkInvalidValuesPasswordConfirmation", (password, passwordConfirmation, errorMessage) => {
    cy.get(signUpSelectors.passwordField).clear().type(password);
    cy.get(signUpSelectors.passwordConfirmationField).clear().type(passwordConfirmation);
    cy.get(signUpSelectors.emailField).click();
    cy.get(signUpSelectors.errorPasswordConfirmationMessage).should("have.text", errorMessage);
    cy.get(signUpSelectors.passwordField).clear();
    cy.get(signUpSelectors.passwordConfirmationField).clear()
  })
  Cypress.Commands.add('signUpAndVerifyEmailSent', () => {
    cy.get(signUpSelectors.buttonSignUp).click();
    cy.wait(5000);
    cy.get(signUpSelectors.emailSent).should('have.text', 'Сообщение отправлено');
    cy.contains('ОК').click({ force: true });
  });
  Cypress.Commands.add('signIn', (Email, Password) => {
    cy.get(signInSelectors.emailField).type(Email);
        cy.get(signInSelectors.passwordField).type(Password);
        cy.get(signInSelectors.buttonSignIn).click();
      });
      Cypress.Commands.add('logout', () => {
        cy.get(sideBarSelectors.logOut).click();
        cy.get(logOutSelectors.buttonYes).click();
      });
      
      
      