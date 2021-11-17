const sidbarModule = require("../Module/sidbarModule");
const data = require("../fixtures/data.json");
module.exports={
    get organizationName(){
        return cy.get("input[name='name']")
    },
    get cancelButton (){
        return cy.get ("button[name='prev_btn']")
    },
    get nextButton () {
        return cy.get("button[name='next_btn']")
    },
    get uploadLogo () {
        return cy.get("a[class='vs-c-btn--rounded']")
    },
    get cancelButtonModal () {
        return cy.get("button[name='cancel-btn']")
    },
    get modal () {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button']")
    },
    get saveButtonModal () {
        return cy.get("button[name='save-btn']")
    },
    get deleteButtonModal () {
        return cy.get("button[name='delete-btn']")
    },
    get editMyOrganization () {
        return cy.get( "div.vs-c-my-organizations-item-wrapper>div:first-child>div.vs-c-my-organization__content>div>div.vs-c-media__body>div.vs-c-my-organization__header>span[title='Edit Organization']")
    },
    get editOrganizationName () {
        return cy.get("input[name='change-organization-name']")
    },
    get saveChange () {
        return cy.get(".el-icon-check")
    },
    get xeditOrganization() {
        return cy.get(".el-icon-close")
    },
    get archiveOrganization () {
        return cy.get("div.vs-c-my-organizations-item-wrapper>div:first-child>div.vs-c-my-organization__content>div>div.vs-c-media__body>div.vs-c-my-organization__header>span[title='Archive Organization']")
    },
    get modalConfirmYourActionNo () {
        return cy.get("button[name='cancel-btn']")
    },
    get modalConfirmYourActionYes () {
        return cy.get("button[name='save-btn']")
    },
    get addProjectsInMyOrganization () {
        return cy.get("div.vs-c-my-organizations-item-wrapper>div:first-child>div.vs-c-my-organization__content>div>div.vs-c-media__body>div.vs-c-my-organization__body>ul.vs-c-my-organization__projects>li")
    },
    get projectName () {
        return cy.get("input[name='name']")
    },
    get addBoardsInMyOrganization () {
        return cy.get("div.vs-c-my-organizations-item-wrapper>div:first-child>div.vs-c-my-organization__content>div>div.vs-c-media__body>div.vs-c-my-organization__body>ul.vs-c-my-organization__boards>li[title='Add new Board']")
    },
    get deleteOrganization () {
        return cy.get("span[title='Delete Organization']")
    },
    get deleteButtonSingleOrganization () {
        return cy.get(".vs-c-btn--warning")
    },
    get enterPasswordToConfrmDelete () {
        return cy.get(".el-input__inner")
    },
    get organizationContent () {
        return cy.get(".vs-c-my-organization__content")
    },

create(name){
    if(name==""){
        sidbarModule.addNew.click()
        sidbarModule.addOrganizationMenuItem.click()
        this.nextButton.click()
        this.nextButton.click()
        this.modal.click()
    } else {
        sidbarModule.addNew.click()
        sidbarModule.addOrganizationMenuItem.click()
        this.organizationName.should('be.visible').type('Test')
        this.nextButton.click()
        this.nextButton.click()
        this.modal.click()
    }
},
arhive(){
    sidbarModule.collapseSidebar.click({ force: true })
    this.organizationContent.eq(0).trigger('mouseover')
    this.archiveOrganization.click({ force: true }, {timeout:3000})
    cy.wait(3000)
    this.modalConfirmYourActionYes.click({ force: true }, {timeout:3000})
},

delete() {
    this.organizationContent.eq(1).trigger('mouseover')
    this.deleteOrganization.scrollIntoView().click({ force: true })
    this.enterPasswordToConfrmDelete.type(data.user.password)
    this.saveButtonModal.click()
},

edit(name=data.organization.newName) {
    if (name=="" ) {
    sidbarModule.collapseSidebar.click()
    this.editMyOrganization.click()
    this.editOrganizationName.clear()
    this.saveChange.click()
    } else {
    sidbarModule.collapseSidebar.click()
    this.editMyOrganization.click()
    this.editOrganizationName.clear().type(name)
    this.saveChange.click()
        }
    },
addProject (){
    sidbarModule.collapseSidebar.click()
    this.addProjectsInMyOrganization.click()
    this.projectName.type(data.organization.projectName)
    this.nextButton.click()
    this.nextButton.click()
},


}
