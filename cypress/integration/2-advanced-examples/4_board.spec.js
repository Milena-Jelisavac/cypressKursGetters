/// <reference types ="Cypress" />

const data = require("../../fixtures/data.json");
const endpoints = require("../../fixtures/endpoints.json")
const authModule = require("../../Module/authModule");
const organizationModule =require('../../Module/organizationModule')
const boardModule = require('../../Module/boardModule')
const sidbarModule=require('../../Module/sidbarModule')
describe("New spec", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  beforeEach("Visit and login", ()=>{
    cy.intercept('POST', endpoints.apiEndpoints.login ).as('login')
    cy.intercept("POST", "**organizations").as('createOrganization')
    cy.intercept("POST", "**boards").as('createBoard')
    cy.intercept("POST", "**/users").as('addUser')
    cy.visit("/", { timeout: 30000 });
    authModule.login({})
    organizationModule.create()
    cy.wait('@createOrganization').then(({response, request})=>{
      expect(response.statusCode).to.eq(200)
      expect(response.body.name).to.eq(data.organization.name)
    })
    
  })
afterEach("Arhive organization and delete", ()=>{
  sidbarModule.collapseSidebar.click()
  organizationModule.arhive()
  sidbarModule.collapseSidebar.click()
  organizationModule.delete()
})

//it("Create board", () => {
   // boardModule.create()
    //cy.wait('@createBoard').then(({response, request})=>{ 
      //expect(response.statusCode).to.eq(201)
      //expect(response.body.name).to.eq(data.board.title)
      //expect(response.statusMessage).to.eq("Created")
    //})
  //});
   it("Edit board title - empty ", () => {
    boardModule.create()
    boardModule.edit({title:""})
    
  });
   it("Edit board titile all space", () => {
    boardModule.create()
    boardModule.edit({title:"    "})
  });
  it("Edit board titile more than 50 characters", () => {
    boardModule.create()
    boardModule.edit({title:data.negativData.string256characters})
  });
  it("Successfully edit title", () => {
    boardModule.create()
    boardModule.edit({title:data.board.newTitle})
  });
  it("Edit board code - empty ", () => {
  boardModule.create()
  boardModule.edit({code:""})
  });
  it("Edit board code - all space ", () => {
    boardModule.create()
  boardModule.edit({code:"     "})
  });
  it("Edit board code -  more than 4 characters", () => {
    boardModule.create()
    boardModule.edit({code:data.negativData.string256characters})
  });
  it("Successfully edit board code", () => {
    boardModule.create()
    boardModule.edit({code:data.board.newCode})
    
  });
  it("Edit with already exists code", () => {
    boardModule.create()
    boardModule.edit({code:data.board.newCode})
  });
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
  // it("Arhive board -press No on modal", () => {
  //   cy.wait('@login')
  //   cy.get(navigation.getBoard).eq(0).should("be.visible").click();
  //   cy.get(settings.board.configureBard).click();
  //   cy.get(board.arhiveBoard).click();
  //   cy.get(board.cancelButtonModal).click();
  // });
  //  it("Arhive board", () => {
  //   cy.get(navigation.getBoard).eq(0).should("be.visible").click();
  //   cy.get(settings.board.configureBard).click();
  //   cy.get(board.arhiveBoard).click();
  //   cy.get(board.saveButtonModal).click();
  // });
  // it("Delete board", () => {
  //   cy.get(organization.organizationContent).eq(0).should("be.visible").click();
  //   cy.get(board.modalBoards).click({ force: true });
  //   cy.get(board.deleteBoard).click({ force: true });
  //   cy.get(board.saveButtonModal).click();
  // });
  
});
