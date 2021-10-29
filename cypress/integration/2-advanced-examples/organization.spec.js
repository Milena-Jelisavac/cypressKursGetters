/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const sidebar = require("../../fixtures/sidebar.json");
const organization = require("../../fixtures/neworganization.json");
const board = require("../../fixtures/newboard.json");
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it("Visit VivifyScrum", () => {
    cy.visit("/", { timeout: 30000 });
  });
  it("Login", () => {
    cy.get(loginPage.email).clear().type(data.user.email);
    cy.get(loginPage.password).clear().type(data.user.password);
    cy.get(loginPage.buttonLogin).click();
  });
  it("Create organization", () => {
    cy.wait(3000);
    cy.get(sidebar.addNew).click();
    cy.get(sidebar.addOrganizationMenuItem).click();
    cy.get(organization.organizationName).type(data.organization.name);
    cy.get(organization.nextButton).click();
    cy.get(organization.nextButton).click();
    cy.get(organization.modal).click();
  });
  it("Edit organization-empty field", () => {
    cy.get(sidebar.collapseSidebar).click();
    cy.get(organization.editMyOrganization).click();
    cy.get(organization.editOrganizationName).clear();
    cy.get(organization.saveChange).click();
  });
  it("Edit organization all space", () => {
    cy.get(organization.editMyOrganization).click();
    cy.get(organization.editOrganizationName)
      .clear()
      .type(data.negativData.nameAllSpace);
    cy.get(organization.saveChange).click();
  });
  it("Change organization name but dont save change", () => {
    cy.get(organization.editMyOrganization).click();
    cy.get(organization.editOrganizationName)
      .clear()
      .type(data.organization.newName);
    cy.get(organization.xeditOrganization).eq(1).click();
  });
  it("Organization name more than 255 characters", () => {
    cy.get(organization.editMyOrganization).click();
    cy.get(organization.editOrganizationName)
      .clear()
      .type(data.negativData.string256characters);
    cy.get(organization.saveChange).click();
  });
  it("Change organization name", () => {
    cy.get(organization.editMyOrganization).click();
    cy.get(organization.editOrganizationName)
      .clear()
      .type(data.organization.newName);
    cy.get(organization.saveChange).click();
  });
  it("Add projects to organization", () => {
    cy.get(organization.addProjectsInMyOrganization).click();
    cy.get(organization.projectName)
      .clear()
      .type(data.organization.projectName);
    cy.get(organization.nextButton).click();
    cy.get(organization.nextButton).click();
  });
  it("Add board in organization", () => {
    cy.get(organization.addBoardsInMyOrganization).click();
    cy.get(board.boardTitle).clear().type(data.board.title);
    cy.get(organization.nextButton).click();
    cy.get(board.scrumRadioButton).click();
    cy.get(organization.nextButton).click();
    cy.get(organization.nextButton).click();
    cy.get(organization.nextButton).click();
  });
  it("Cancel arhive organization", () => {
    cy.get(sidebar.collapseSidebar).click({ force: true });
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.modalConfirmYourActionNo).click();
  });
  it("Arhive organization", () => {
    cy.get(sidebar.collapseSidebar).click({ force: true });
    cy.get(organization.archiveOrganization).click({ force: true });
    cy.get(organization.modalConfirmYourActionYes).click();
  });
  it("Delete organization", () => {
    cy.get(organization.deleteOrganization).click({ force: true });
    cy.get(organization.enterPasswordToConfrmDelete).type(data.user.password);
    cy.get(organization.saveButtonModal).click();
  });
});
