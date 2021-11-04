const sidbarModule = require("../Module/sidbarModule");
const data = require("../fixtures/data.json");
const organizationModule = require("../Module/organizationModule")
const navigationModule=require("../Module/navigationModule")
const settings=require('../fixtures/settings.json')
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
        this.updateButtonConfiguration.eq(1).click({ force: true })
    }
  
}
}

   
  
   


// {
//     "organizationName": "input[class='el-input__inner']",
//     "selectOrganizationFromDropDown": ".el-scrollbar__view>li:first-of-type",
    
//     "cancel": "button[name='prev_btn']",
//     "next": "button[name='next_btn']", 
//     "kanbanRadioButton": "span[name='type_kanban']",
//     "configuration": "form.el-form>div>div:first-of-type>div.vs-input-border>div",
//     "teamMembersFrom": "form.el-form>div>div:last-of-type>div.vs-input-border>div",
//     "uploadBoardLogo": "div[class='el-upload-dragger']",
//     "cancelButtonModal": "button[name='cancel-btn']",
//     "saveButtonModal": "button[name='save-btn']",
//     "deleteButtonModal": "button[name='delete-btn']",
//     "modalBoards": ".vs-c-modal--features-button > .vs-c-btn",
//     "addMember": ":nth-child(1) > .vs-c-boards-item__header>.vs-c-boards-item__actions span",
//     "memberEmail": "input[type='text']",
//     "arhiveBoard": ".vs-c-btn.vs-c-btn--spaced.vs-c-btn--success > span:nth-of-type(2)",
//     "firstBoard": "div:nth-of-type(1) > .vs-c-boards-item__content > .vs-c-boards-item__active-sprints",
//     
//     "code": "input[name='code']",
//     "deleteBoard": ".vs-c-organization-boards__item.vs-c-organization-boards__item--archived > .vs-c-boards-item__header > .vs-c-boards-item__actions.vs-u-display--flex > div:nth-of-type(1)"
//   }