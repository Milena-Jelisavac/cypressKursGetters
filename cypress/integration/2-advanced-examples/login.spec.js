/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const sidebar = require("../../fixtures/sidebar.json");
const navigation = require("../../fixtures/navigation.json");
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it("Visit VivifyScrum", () => {
    cy.visit("/", { timeout: 30000 });
  });

  it("Without email", () => {
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Email without dot", () => {
    cy.get(loginPage.Email).clear().type(data.negativData.emailWithoutDot);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Email without @", () => {
    cy.get(loginPage.Email).clear().type(data.negativData.emailWithout);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Email without bottom Part", () => {
    cy.get(loginPage.Email)
      .clear()
      .type(data.negativData.emailWithoutBottomPart);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Email without com", () => {
    cy.get(loginPage.Email).clear().type(data.negativData.emailWithoutCom);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Valid email invalid password", () => {
    cy.get(loginPage.Email).clear().type(data.user.email);
    cy.get(loginPage.Password).clear().type(data.negativData.wrongPass);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Without pass", () => {
    cy.get(loginPage.Email).clear().type(data.user.email);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Login", () => {
    cy.get(loginPage.Email).clear().type(data.user.email);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Logout", () => {
    cy.get(sidebar.Account).click();
    cy.get(sidebar.User).click();
    cy.get(navigation.LogoutButton).click();
  });
});
