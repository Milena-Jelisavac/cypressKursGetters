
import './commands';
import authElements from '../support/elements/authElements'
const data = require("../fixtures/data.json");

Cypress.Commands.add('setupTests', () => {
    cy.intercept("/login").as("login");
    cy.visit("/");
})
Cypress.Commands.add('login', (email = data.user.email, password = data.user.password) => {
    cy.get(authElements.email).type(email);
    cy.get(authElements.password).type(password);
    cy.get(authElements.buttonLogin).click();
});




