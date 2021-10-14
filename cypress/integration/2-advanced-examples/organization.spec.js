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
    cy.get(loginPage.Email).clear().type(data.user.email);
    cy.get(loginPage.Password).clear().type(data.user.password);
    cy.get(loginPage.ButtonLogin).click();
  });
  it("Create organization", () => {
    cy.wait(3000);
    cy.get(sidebar.AddNew).click();
    cy.get(sidebar.AddOrganizationMenuItem).click();
    cy.get(organization.OrganizationName).type(data.organization.name);
    cy.get(organization.NextButton).click();
    cy.get(organization.NextButton).click();
    cy.get(organization.Modal).click();
  });
  it("Edit organization-empty field", () => {
    cy.get(sidebar.CollapseSidebar).click();
    cy.get(organization.EditMyOrganization).click();
    cy.get(organization.EditOrganizationName).clear();
    cy.get(organization.SaveChange).click();
  });
  it("Edit organization all space", () => {
    cy.get(organization.EditMyOrganization).click();
    cy.get(organization.EditOrganizationName)
      .clear()
      .type(data.negativData.nameAllSpace);
    cy.get(organization.SaveChange).click();
  });
  it("Change organization name but dont save change", () => {
    cy.get(organization.EditMyOrganization).click();
    cy.get(organization.EditOrganizationName)
      .clear()
      .type(data.organization.newName);
    cy.get(organization.XeditOrganization).eq(1).click();
  });
  it("Organization name more than 255 characters", () => {
    cy.get(organization.EditMyOrganization).click();
    cy.get(organization.EditOrganizationName)
      .clear()
      .type(data.negativData.string256characters);
    cy.get(organization.SaveChange).click();
  });
  it("Change organization name", () => {
    cy.get(organization.EditMyOrganization).click();
    cy.get(organization.EditOrganizationName)
      .clear()
      .type(data.organization.newName);
    cy.get(organization.SaveChange).click();
  });
  it("Add projects to organization", () => {
    cy.get(organization.AddProjectsInMyOrganization).click();
    cy.get(organization.ProjectName)
      .clear()
      .type(data.organization.projectName);
    cy.get(organization.NextButton).click();
    cy.get(organization.NextButton).click();
  });
  it("Add board in organization", () => {
    cy.get(organization.AddBoardsInMyOrganization).click();
    cy.get(board.BoardTitle).clear().type(data.board.title);
    cy.get(organization.NextButton).click();
    cy.get(board.ScrumRadioButton).click();
    cy.get(organization.NextButton).click();
    cy.get(organization.NextButton).click();
    cy.get(organization.NextButton).click();
  });
  it("Cancel arhive organization", () => {
    cy.get(sidebar.CollapseSidebar).click({ force: true });
    cy.get(organization.ArchiveOrganization).click({ force: true });
    cy.get(organization.ModalConfirmYourActionNo).click();
  });
  it("Arhive organization", () => {
    cy.get(sidebar.CollapseSidebar).click({ force: true });
    cy.get(organization.ArchiveOrganization).click({ force: true });
    cy.get(organization.ModalConfirmYourActionYes).click();
  });
  it("Delete organization", () => {
    cy.get(organization.DeleteOrganization).click({ force: true });
    cy.get(organization.EnterPasswordToConfrmDelete).type(data.user.password);
    cy.get(organization.SaveButtonModal).click();
  });
});
