/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const navigation = require("../../fixtures/navigation.json");
const registration = require("../../fixtures/register.json");
const sidebar = require("../../fixtures/sidebar.json");
const validationMessage= require("../../fixtures/validationMessage.json")
const endPoints = require ("../../fixtures/endpoints.json")
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  before('Visit registration page', ()=>{
    cy.visit("/", { timeout: 30000 });
    cy.get(loginPage.singUpLink).click();
    cy.get(registration.monthlyStarter).click({ force: true });
    cy.get(registration.starterAcount).click({ force: true });
  })
  beforeEach('Clear all inpurt', ()=>{
    cy.get(registration.email).clear()
    cy.get(registration.password).clear()
    cy.get(registration.numberOfUsers).clear()
    cy.visit('/sign-up?type=monthly&plan=1&event=page-card')
  })
  it("All empty fields", () => {
    cy.get(registration.startYourFreeTrail).click();
  });
  it("Registration without email", ()=>{
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text",validationMessage.register.invalidEmail )
  })
  it("Registration without password", ()=>{
    cy.get(registration.email).type(data.registration.email);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.passwordRequired)
  })
  it("Registration without number of users", () => {
    cy.get(registration.email).clear().type(data.registration.email);
    cy.get(registration.password).clear().type(data.registration.password);
    cy.get(registration.numberOfUsers).clear();
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.numberOfUserRequired)
  });
  it("Registration with email without upper part", () => {
    cy.get(registration.email)    
      .type(data.negativData.emailWithoutFirstPart);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });
  it("Registration with email without @", () => {
    cy.get(registration.email).type(data.negativData.emailWithout);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text",validationMessage.register.invalidEmail)
  });
  it("Registration with email without bottom part", () => {
    cy.get(registration.email)
      .type(data.negativData.emailWithoutBottomPart);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)     
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });
  it("Registration with email without com", () => {
    cy.get(registration.email).type(data.negativData.emailWithoutCom);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });
  it("Registration with email without .", () => {
    cy.get(registration.email).type(data.negativData.emailWithoutDot);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
       .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });
  it("Registration with a password shorter than 5 characters", () => {
    cy.get(registration.email).type(data.registration.email);
    cy.get(registration.password).type(data.negativData.shortPassword);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.shortPassword)
  });
  it("Registration with 0 number of user", () => {
    cy.get(registration.email).type(data.registration.email);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.negativData.minNumberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.numberOfUserLimit)
  });
  it("Registration with more than allowed number of user", () => {
    cy.get(registration.email).type(data.registration.email);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.negativData.maxNumberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.numberOfUserLimit)
  });
  it("Registration with email of an another user", () => {
    cy.intercept("POST", endPoints.apiEndpoints.register).as('unsuccessfulRegistration')
    cy.get(registration.email).type(data.negativData.wrongEmail);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
   cy.wait('@unsuccessfulRegistration').then(({response})=>{
     expect(response.statusCode).to.eq(401)
     expect(response.body.message.email[0]).to.eq(validationMessage.register.existingUser)
   })

  });
  it("Successfully registration", () => {
    cy.intercept("POST", endPoints.apiEndpoints.register).as('successfulRegistration')
    cy.get(registration.email).type(data.registration.email);
    cy.get(registration.password).type(data.registration.password);
    cy.get(registration.numberOfUsers)
      .type(data.registration.numberOfUser);
    cy.get(registration.startYourFreeTrail).click();
    cy.wait('@successfulRegistration').then(({response})=>{
      expect(response.statusCode).to.eq(200)
    })
  });
  // it("Logout", () => {
  //   cy.wait(2000);
  //   cy.get(sidebar.Account).click();
  //   cy.get(sidebar.User).click();
  //   cy.get(navigation.LogoutButton).click();
  // });
  // it("Login", () => {
  //   cy.visit("/");
  //   cy.get(loginPage.Email).clear().type(data.registration.email);
  //   cy.get(loginPage.Password).clear().type(data.registration.password);
  //   cy.get(loginPage.ButtonLogin).click();
  // });
  // it("Finish registration", () => {
  //   cy.get(registration.ModalCancelRegistration).click();
  // });
});
