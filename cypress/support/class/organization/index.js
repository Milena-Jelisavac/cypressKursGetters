import Utils from '../utils';
const utils=new Utils()
class Organization {
    setupTests() {
        utils.visitUrl('/');
    }

    createOrganization(organizationName) {
        cy.createOrganization(organizationName)
    }

    arhiveOrganization() {
        cy.arhiveOrganization()
    }

    deleteOrganization() {
       cy.deleteOrganization()
    }
}

export default Organization;