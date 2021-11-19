/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const registration = require("../../fixtures/register.json");
const validationMessage= require("../../fixtures/validationMessage.json")
const endPoints = require ("../../fixtures/endpoints.json")
const registerModule =require('../../Module/registerModule');
const authModule=require("../../Module/authModule")


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
    cy.intercept("POST", endPoints.apiEndpoints.register).as('unsuccessfulRegistration')
    cy.intercept("POST", endPoints.apiEndpoints.register).as('successfulRegistration')
  })

  it('All empty fields', ()=>{
    registerModule.register({email:""})
    cy.get(registration.validationMessage).should("have.text",validationMessage.register.allRequiredFields)
  })
 
  it("Registration with email without upper part", () => {
    registerModule.register({email:data.negativData.emailWithoutFirstPart})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });

  it("Registration with email without @", () => {
    registerModule.register({email:data.negativData.emailWithout})
    cy.get(registration.validationMessage).should("have.text",validationMessage.register.invalidEmail)
  });

  it("Registration with email without bottom part", () => {
    registerModule.register({email:data.negativData.emailWithoutBottomPart})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });

  it("Registration with email without com", () => {
    registerModule.register({email:data.negativData.emailWithoutCom})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });

  it("Registration with email without .", () => {
    registerModule.register({email:data.negativData.emailWithoutDot})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.invalidEmail)
  });

  it("Registration with a password shorter than 5 characters", () => {
    registerModule.register({password:data.negativData.shortPassword})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.shortPassword)
  });

  it("Registration with 0 number of user", () => {
    registerModule.register({numberOfUsers:data.negativData.minNumberOfUser})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.numberOfUserLimit)
  });

  it("Registration with more than allowed number of user", () => {
    registerModule.register({numberOfUsers:data.negativData.maxNumberOfUser})
    cy.get(registration.validationMessage).should("have.text", validationMessage.register.numberOfUserLimit)
  });

  it("Registration with email of an another user", () => {
    registerModule.register({email:data.negativData.wrongEmail})
    cy.wait('@unsuccessfulRegistration').then(({response})=>{
     expect(response.statusCode).to.eq(401)
     expect(response.body.message.email[0]).to.eq(validationMessage.register.existingUser)
    })
  });

  it("Regiser with unchecked I agree terms", ()=>{
    registerModule.register({iAgreeCheckBox:false})
    cy.get(registration.validationMessage).should("have.text", "The agree to terms and privacy policy field is required")
  })

  it("Successfully registration", () => {
    registerModule.register({})
    cy.wait('@successfulRegistration').then(({response})=>{
      expect(response.statusCode).to.eq(200)
    })
  });
  
});
  describe("Finish registration", ()=>{
    before('Login', ()=>{
      cy.visit('/')
      cy.intercept('POST', "**/api/v2/login").as('login')
      authModule.login({email:data.registration.email, password:data.registration.password})
    })
    // it("Finish registration", () => {
    //   cy.wait('@login');
    //   //authModule.logout()
    //   //authModule.login({email:data.registration.email, password:data.registration.password})
    //   cy.wait(3000)
    //   cy.get("input[name='first_name']").should("be.visible").type("Test");
    //   cy.wait(3000)
    //   cy.get("input[name='last_name']").should("be.visible").type("Test");
    //   cy.wait(3000)
    //   cy.get("input[name='company_name']").type("Test");
    //   cy.wait(3000)
    //   cy.get("input[name='organization_name']").type("Test");
    //   cy.wait(3000)
    //   cy.get("button[type='submit']").click()
    // })
  })
 


