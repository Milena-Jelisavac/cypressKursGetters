/// <reference types ="Cypress" />
const loginPage = require("../../fixtures/login.json");
const data = require("../../fixtures/data.json");
const navigation = require("../../fixtures/navigation.json");
const registration = require("../../fixtures/register.json");
const sidebar = require("../../fixtures/sidebar.json");
const board = require("../../fixtures/newboard.json");
const organization = require("../../fixtures/neworganization.json");
const settings = require("../../fixtures/settings.json");

describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
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

  it("Create board", () => {
    cy.wait(3000);
    cy.get(sidebar.AddNew).click();
    cy.get(sidebar.AddBoarMenuItem).click({ force: true });
    cy.get(board.BoardTitle).clear().type(data.board.title);
    cy.get(organization.NextButton).click({ force: true });
    cy.get(board.ScrumRadioButton).click();
    cy.get(organization.NextButton).click({ force: true });
    cy.get(organization.NextButton).click({ force: true });
    cy.get(organization.NextButton).click({ force: true });
  });
  it("Edit board-Add member", () => {
    cy.wait(3000);
    cy.get(navigation.Organization).click();
    cy.wait(3000);
    cy.get(board.ModalBoards).click({ force: true });
    cy.get(board.AddMember).click({ force: true });
    cy.get(board.MemberEmail).type(data.board.memberEmail);
    cy.get(board.SaveButtonModal).click();
  });
  it("Edit board-add member and cancel", () => {
    cy.get(board.AddMember).click({ force: true });
    cy.get(board.MemberEmail).type(data.board.memberEmail);
    cy.get(board.CancelButtonModal).click();
  });
  it("Edit board title - empty ", () => {
    cy.get(board.FirstBoard).click();
    cy.wait(3000);
    cy.get(settings.board.configureBard).click();
    cy.get(board.BoardTitle).clear();
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board titile all space", () => {
    cy.get(board.BoardTitle).clear().type(data.negativData.nameAllSpace);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board titile more than 50 characters", () => {
    cy.get(board.BoardTitle).clear().type(data.negativData.string256characters);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Successfully edit title", () => {
    cy.get(board.BoardTitle).clear().type(data.board.newTitle);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code - empty ", () => {
    cy.get(board.Code).clear();
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code - all space ", () => {
    cy.get(board.Code).clear().type(data.negativData.nameAllSpace);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit board code -  more than 4 characters", () => {
    cy.get(board.Code).clear().type(data.negativData.string256characters);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Successfully edit board code", () => {
    cy.get(board.Code).clear().type(data.board.newCode);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Edit with already exists code", () => {
    cy.get(board.Code).clear().type(data.board.newCode);
    cy.get(board.UpdateButtonConfiguration).eq(1).click({ force: true });
  });
  it("Arhive board -press No on modal", () => {
    cy.get(board.ArhiveBoard).click();
    cy.get(board.CancelButtonModal).click();
  });
  it("Arhive board", () => {
    cy.get(board.ArhiveBoard).click();
    cy.get(board.SaveButtonModal).click();
  });
  it("Delete board", () => {
    cy.get(board.ModalBoards).click({ force: true });
    cy.get(board.DeleteBoard).click({ force: true });
    cy.get(board.SaveButtonModal).click();
  });
  it("Arhive organization", () => {
    cy.get(sidebar.AllOrganization).click({ force: true });
    cy.get(organization.ArchiveOrganization).click({ force: true });
    cy.get(organization.ModalConfirmYourActionYes).click({ force: true });
  });
  it("Delete organization", () => {
    cy.get(board.ModalBoards).click({ force: true });
    cy.get(organization.DeleteButtonSingleOrganization).click({ force: true });
    cy.get(organization.EnterPasswordToConfrmDelete).type(data.user.password);
    cy.get(organization.SaveButtonModal).click();
  });
});
