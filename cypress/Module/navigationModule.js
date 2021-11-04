const data = require("../fixtures/data.json");
module.exports={
    get search (){
        return cy.get("div[class='vs-c-project-search']")
    },
    get notification () {
        return cy.get("div[class='el-tooltip button']")
    },
    get howItWorks(){
        return cy.get ("div.vs-l-project__options >button")
    },
    get logoutButton(){
        return cy.get(".vs-c-btn--danger")
    },
    get organization (){
        return cy.get('".vs-l-organization__title.vs-u-cursor--default > .vs-c-img--avatar.vs-u-cursor--pointer"')
    },
    get sing(){
        return cy.get(".vs-l-project__header > .vs-c-site-logo > .vs-c-site-sign")
    },
    get getBoard(){
        return cy.get(".vs-c-list__btn  .vs-c-img--avatar.vs-c-img--board-avatar")
    },
    get getOrganization (){
        return cy.get("li[title='Test']")
    }
}
  