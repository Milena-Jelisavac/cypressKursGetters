import boardElements from "../support/elements/boardElements";
import organizationElements from "../support/elements/organizationElements";
import sidbarElements from "./elements/sidbarElements";
import data from '../fixtures/data.json'
Cypress.Commands.add("createOrganization", (organizationName=data.organization.name) => {
    cy.get(sidbarElements.addNew).click()
    cy.get(sidbarElements.addOrganization).click()
    cy.get(organizationElements.organizationName).clear().type(organizationName);
    cy.get(organizationElements.nextButton).click();
    cy.get(organizationElements.nextButton).click();
    cy.get(organizationElements.modal).click()
   
  });

Cypress.Commands.add('deleteOrganization', (password=data.user.password)=>{
  cy.get(organizationElements.organizationContent).eq(1).trigger('mouseover')
  cy.get(organizationElements.deleteOrganization).scrollIntoView().click({ force: true })
  cy.get(organizationElements.enterPasswordToConfrmDelete).type(password)
  cy.get(organizationElements.saveButtonModal).click()
})
Cypress.Commands.add('arhiveOrganization', ()=>{
  cy.get(sidbarElements.collapseSidebar).click({ force: true })
  cy.get(organizationElements.organizationContent).eq(0).trigger('mouseover')
  cy.get(organizationElements.archiveOrganization).click({ force: true }, {timeout:3000})
  cy.wait(3000)
  cy.get(organizationElements.modalConfirmYourActionYes).click({ force: true }, {timeout:3000})
})

Cypress.Commands.add('createBoard', ()=>{
  cy.get(sidbarElements.addNew).click()
  cy.get(sidbarElements.addBoarMenuItem).click({ force: true })
  cy.get(boardElements.boardTitle).should('be.visible').clear().type(data.board.title);
  cy.get(organizationElements.nextButton).click()
  cy.get(boardElements.scrumRadioButton).click()
  cy.get(organizationElements.nextButton).click({ force: true })
  cy.get(organizationElements.nextButton).click({ force: true })
  cy.get(organizationElements.nextButton).click({ force: true })
})

