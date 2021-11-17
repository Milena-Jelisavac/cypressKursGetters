const sidbarModule = require("../Module/sidbarModule");
const data = require("../fixtures/data.json");
const organizationModule = require("../Module/organizationModule")
const navigationModule=require("../Module/navigationModule")
module.exports={
  get boardTitle (){
      return cy.get("input[name='name']")
  },
  get scrumRadioButton(){
      return cy.get("span[name='type_scrum']")
  },
  get updateButtonConfiguration (){
      return cy.get("button[type='submit']")
  },
  get configureBoard (){
      return cy.get("li:nth-of-type(10) > span > div > .vs-c-site-logo")
  },
  get code() {
      return cy.get("input[name='code']")
  },
    
    create(){
        sidbarModule.addNew.click()
        sidbarModule.addBoarMenuItem.click({ force: true })
        this.boardTitle.should('be.visible').clear().type(data.board.title);
        organizationModule.nextButton.click()
        this.scrumRadioButton.click()
        organizationModule.nextButton.click({ force: true })
        organizationModule.nextButton.click({ force: true })
        organizationModule.nextButton.click({ force: true })
       // organizationModule.nextButton.click({ force: true })    
    },
    
    edit({title=data.board.newTitle, code=data.board.code}){
        if(title=="" || code==""){
            this.configureBoard.click({ force: true })
            this.boardTitle.clear()
            this.code.clear()
            this.updateButtonConfiguration.eq(1).click({ force: true })
        } else {
            navigationModule.getBoard.eq(0).click({ force: true })
            this.configureBoard.click()
            this.boardTitle.clear().type(title)
            this.code.clear.type(code)
            this.updateButtonConfiguration.eq(1).click({ force: true })
         }
    }
}
