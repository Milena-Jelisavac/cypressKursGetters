import Organization from '../../support/class/organization'
const organization=new Organization()

import Board from '../../support/class/board'
const  board=new Board()

describe("Custum commands",() =>{
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    beforeEach("Setup", ()=>{
        cy.setupTests()
        cy.login()
    })
it('Create organization', ()=>{
 cy.createOrganization('TestNovi')
})
it('Create borad', ()=>{
cy.createBoard()
})
it('Arhive organization', ()=>{
    cy.arhiveOrganization()
})
it('Delete organization', ()=>{
    cy.deleteOrganization()
})
})
