/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json")
const endpoints = require("../../fixtures/endpoints.json")
const validationMessages= require("../../fixtures/validationMessage.json");
const authModule = require("../../Module/authModule");

describe("Login and assertion", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach("Clear input and visit site", ()=>{
    cy.visit("/", { timeout: 30000 });
    cy.get(loginPage.email).clear()
    cy.get(loginPage.password).clear()
  })

  it.only("Login without email", () => {
    authModule.login({email:""})
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });

  it("Login invalid email - email without dot", () => {
    authModule.login({email:data.negativData.emailWithoutDot, password:data.user.password})
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });

  it("Login invalid email - email without @", () => {
    authModule.login({email:data.negativData.emailWithout})
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });

  it("Login invalid email - email without bottom Part", () => {
    authModule.login({email:data.negativData.emailWithoutBottomPart})
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });

  it("Login invalid email - email without com", () => {
    authModule.login({email:data.negativData.emailWithoutCom})
    cy.get(loginPage.errorMessage).eq(0).should('have.text', validationMessages.login.validEmail)
  });

  it("Login valid email invalid password", () => {
    authModule.login({password:data.negativData.wrongPass})
    cy.get(".vs-c-custom-errors ").eq(0).should('have.text', validationMessages.login.wrongCredentials)
  });

  it("Login without pass", () => {
    authModule.login({password:""})
    cy.get(loginPage.errorMessage).eq(1).should('have.text', validationMessages.login.requiredPass)
  });

  it("Successfully login", () => {
    cy.intercept('POST', endpoints.apiEndpoints.login ).as('login')
    authModule.login({})
    cy.wait('@login').then(({response, request})=>{
      expect(response.statusCode).to.eq(200)
      expect(request.body.email).to.eq(data.user.email)
      expect(request.body.password).to.eq(data.user.password)
    })
  });

  it("Logout", () => {
    authModule.login({})
    authModule.logout()
  });

});
