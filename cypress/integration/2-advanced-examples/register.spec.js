/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const navigation = require("../../fixtures/navigation.json");
const registration = require("../../fixtures/register.json");
const sidebar = require("../../fixtures/sidebar.json");

describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  it("Visit VivifyScrum", () => {
    cy.visit("/", { timeout: 30000 });
  });
  it("Go to registration form", () => {
    cy.get(loginPage.SingUpLink).click();
    cy.get(registration.MonthlyStarter).click({ force: true });
    cy.get(registration.StarterAcount).click({ force: true });
  });
  it("All empty fields", () => {
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration without number of users", () => {
    cy.get(registration.Email).clear().type(data.registration.email);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers).clear();
    cy.wait(3000);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email without upper part", () => {
    cy.get(registration.Email)
      .clear()
      .type(data.negativData.emailWithoutFirstPart);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email without @", () => {
    cy.get(registration.Email).clear().type(data.negativData.emailWithout);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email without bottom part", () => {
    cy.get(registration.Email)
      .clear()
      .type(data.negativData.emailWithoutBottomPart);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email without com", () => {
    cy.get(registration.Email).clear().type(data.negativData.emailWithoutCom);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email without .", () => {
    cy.get(registration.Email).clear().type(data.negativData.emailWithoutDot);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with a password shorter than 5 characters", () => {
    cy.get(registration.Email).clear().type(data.registration.email);
    cy.get(registration.Password).clear().type(data.negativData.shortPassword);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with 0 number of user", () => {
    cy.get(registration.Email).clear().type(data.registration.email);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.negativData.minNumberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with more than allowed number of user", () => {
    cy.get(registration.Email).clear().type(data.registration.email);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.negativData.maxNumberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Registration with email of an another user", () => {
    cy.get(registration.Email).clear().type(data.negativData.wrongEmail);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Successfully registration", () => {
    cy.get(registration.Email).clear().type(data.registration.email);
    cy.get(registration.Password).clear().type(data.registration.password);
    cy.get(registration.NumberOfUsers)
      .clear()
      .type(data.registration.numberOfUser);
    cy.get(registration.StartYourFreeTrail).click();
  });
  it("Logout", () => {
    cy.wait(2000);
    cy.get(sidebar.Account).click();
    cy.get(sidebar.User).click();
    cy.get(navigation.LogoutButton).click();
  });
  it("Login", () => {
    cy.visit("/");
    cy.get(loginPage.Email).clear().type(data.registration.email);
    cy.get(loginPage.Password).clear().type(data.registration.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Finish registration", () => {
    cy.get(registration.ModalCancelRegistration).click();
  });
});
