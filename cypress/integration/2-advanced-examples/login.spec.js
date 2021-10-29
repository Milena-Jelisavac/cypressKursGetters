/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const sidebar = require("../../fixtures/sidebar.json");
const navigation = require("../../fixtures/navigation.json");
const endpoints = require("../../fixtures/endpoints.json")
const validationMessages= require("../../fixtures/validationMessage.json")
describe("Login and assertion", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach("Clear input and visit site", ()=>{
    cy.visit("/", { timeout: 30000 });
    cy.get(loginPage.email).clear()
    cy.get(loginPage.password).clear()
    
  })
  it("Login without email", () => {
    cy.get(loginPage.password).type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });
  it("Login invalid email - email without dot", () => {
    cy.get(loginPage.email).type(data.negativData.emailWithoutDot);
    cy.get(loginPage.password).type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });
  it("Login invalid email - email without @", () => {
    cy.get(loginPage.email).clear().type(data.negativData.emailWithout);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });
  it("Login invalid email - email without bottom Part", () => {
    cy.get(loginPage.email)
      .clear()
      .type(data.negativData.emailWithoutBottomPart);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });
  it("Login invalid email - email without com", () => {
    cy.get(loginPage.email).clear().type(data.negativData.emailWithoutCom);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
   
  });
  it("Login valid email invalid password", () => {
    cy.get(loginPage.email).clear().type(data.user.email);
    cy.get(loginPage.password).clear().type(data.negativData.wrongPass);
    cy.get(loginPage.buttonLogin).click();
    cy.get(".vs-c-custom-errors ").eq(0).should('have.text', validationMessages.login.wrongCredentials)
  });

  it("Login without pass", () => {
    cy.get(loginPage.email).clear().type(data.user.email);
    cy.get(loginPage.buttonLogin).click();
    cy.get(loginPage.errorMessage).eq(1).should('have.text', validationMessages.login.requiredPass)
  });

  it("Successfully login", () => {
    cy.intercept('POST', endpoints.apiEndpoints.login ).as('login')
    cy.get(loginPage.email).clear().type(data.user.email);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
    cy.wait('@login').then(({response, request})=>{
      expect(response.statusCode).to.eq(200)
      expect(request.body.email).to.eq(data.user.email)
      expect(request.body.password).to.eq(data.user.password)
    })
  });
  // it("Logout", () => {
  //   cy.get(sidebar.Account).click();
  //   cy.get(sidebar.User).click();
  //   cy.get(navigation.LogoutButton).click();
  // });
});
