/// <reference types ="Cypress" />

const data = require("../../fixtures/data.json");
const organizationModule = require("../../Module/organizationModule");
const authModule = require("../../Module/authModule");
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  before("Visit home page and login",()=>{
    cy.visit("/", { timeout: 30000 });
    authModule.login({})
  })

  beforeEach('Create organization', ()=>{
    organizationModule.create()
  })

  afterEach('Arhive and delete organization', ()=>{
    organizationModule.arhive()
    organizationModule.delete()
  })

  it("Edit organization-empty field", () => {
    organizationModule.edit(name="")
  });

  it("Edit organization all space", () => {
    organizationModule.edit(name=data.negativData.nameAllSpace)
  });

  it("Organization name more than 255 characters", () => {
    organizationModule.edit(name=data.negativData.string256characters)
  
  });
  it("Change organization name", () => {
    organizationModule.edit(name=data.organization.newName)
  });

  it("Add projects to organization", () => {
    organizationModule.addProject()
  });

  // it("Cancel arhive organization", () => {
  //   cy.get(sidebar.collapseSidebar).click({ force: true });
  //   cy.get(organization.archiveOrganization).click({ force: true });
  //   cy.get(organization.modalConfirmYourActionNo).click();
  // });
 
});
