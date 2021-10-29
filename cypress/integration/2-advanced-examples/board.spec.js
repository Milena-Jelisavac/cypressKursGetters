/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const navigation = require("../../fixtures/navigation.json");
const registration = require("../../fixtures/register.json");
const sidebar = require("../../fixtures/sidebar.json");
const board = require("../../fixtures/newboard.json");
const organization = require("../../fixtures/neworganization.json");
const settings = require("../../fixtures/settings.json");
const endpoints = require("../../fixtures/endpoints.json")
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach("Visit and login", ()=>{
    cy.intercept('POST', endpoints.apiEndpoints.login ).as('login')
    cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations").as('createOrganization')
    cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/boards").as('createBoard')
    cy.intercept("POST", "**/users").as('addUser')
    cy.visit("/", { timeout: 30000 });
    cy.get(loginPage.email).clear().type(data.user.email);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
  })
  // it("Create organization", () => {
  //   cy.wait('@login')
  //   cy.get(sidebar.addNew).click();
  //   cy.get(sidebar.addOrganizationMenuItem).click();
  //   cy.get(organization.organizationName).type(data.organization.name);
  //   cy.get(organization.nextButton).click();
  //   cy.get(organization.nextButton).click();
  //   cy.get(organization.modal).click();
  //   cy.wait('@createOrganization').then(({response, request})=>{
  //     expect(response.statusCode).to.eq(200)
  //     expect(response.body.name).to.eq(data.organization.name)
  //   })
  // });

  // it("Create board", () => {
  //   cy.wait('@login')
  //   cy.get(sidebar.addNew).click();
  //   cy.get(sidebar.addBoarMenuItem).click({ force: true });
  //   cy.get(board.boardTitle, {timeout:3000}).clear().type(data.board.title);
  //   cy.get(organization.nextButton).click({ force: true });
  //   cy.get(board.scrumRadioButton).click();
  //   cy.get(organization.nextButton).click({ force: true });
  //   cy.get(organization.nextButton).click({ force: true });
  //   cy.get(organization.nextButton).click({ force: true });
  //   cy.wait('@createBoard').then(({response, request})=>{ 
  //     expect(response.statusCode).to.eq(201)
  //     expect(response.body.name).to.eq(data.board.title)
  //     expect(response.statusMessage).to.eq("Created")
  //   })
  // });
  // it("Edit board-Add member", () => {
  //   cy.wait('@login')
  //   cy.get(navigation.sign).click()
  //   cy.get(organization.organizationContent).eq(0).should("be.visible").click();
  //   cy.get(board.modalBoards).click({ force: true });
  //   cy.get(board.addMember).click({ force: true });
  //   cy.get(board.memberEmail).type(data.board.memberEmail);
  //   cy.get(board.saveButtonModal).click();
  //   cy.wait("@addUser").then(({response})=>{
  //     expect(response.body.recipient_email).to.eq(data.board.memberEmail)
  //     expect(response.statusCode).to.eq(201)
  //     expect(response.statusMessage).to.eq("Created")
  //   })
  // });
  // it("Edit board-add member and cancel", () => {
  //   cy.wait('@login')
  //   cy.get(navigation.sign).click()
  //   cy.get(organization.organizationContent).eq(0).should("be.visible").click();
  //   cy.get(board.modalBoards).click({ force: true });
  //   cy.get(board.addMember).click({ force: true });
  //   cy.get(board.memberEmail).type(data.board.memberEmail);
  //   cy.get(board.cancelButtonModal).click();
  // });
   it("Edit board title - empty ", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.boardTitle).clear();
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
   it("Edit board titile all space", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.boardTitle).type(data.negativData.nameAllSpace);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board titile more than 50 characters", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.boardTitle).type(data.negativData.string256characters);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Successfully edit title", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.boardTitle).type(data.board.newTitle);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code - empty ", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.code).clear();
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code - all space ", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.code).type(data.negativData.nameAllSpace);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code -  more than 4 characters", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.code).clear().type(data.negativData.string256characters);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Successfully edit board code", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.code).clear().type(data.board.newCode);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit with already exists code", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.code).clear().type(data.board.newCode);
    cy.get(board.updateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Arhive board -press No on modal", () => {
    cy.wait('@login')
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.arhiveBoard).click();
    cy.get(board.cancelButtonModal).click();
  });
   it("Arhive board", () => {
    cy.get(navigation.getBoard).eq(0).should("be.visible").click();
    cy.get(settings.board.configureBard).click();
    cy.get(board.arhiveBoard).click();
    cy.get(board.saveButtonModal).click();
  });
  it.only("Delete board", () => {
    cy.get(organization.organizationContent).eq(0).should("be.visible").click();
    cy.get(board.modalBoards).click({ force: true });
    cy.get(board.deleteBoard).click({ force: true });
    cy.get(board.saveButtonModal).click();
  });
  // it("Arhive organization", () => {
  //   cy.get(sidebar.AllOrganization).click({ force: true });
  //   cy.get(organization.ArchiveOrganization).click({ force: true });
  //   cy.get(organization.ModalConfirmYourActionYes).click({ force: true });
  // });
  // it("Delete organization", () => {
  //   cy.get(board.ModalBoards).click({ force: true });
  //   cy.get(organization.DeleteButtonSingleOrganization).click({ force: true });
  //   cy.get(organization.EnterPasswordToConfrmDelete).type(data.user.password);
  //   cy.get(organization.SaveButtonModal).click();
  // });
});
