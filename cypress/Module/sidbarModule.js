module.exports={
 get collapseSidebar (){
     return cy.get('.vs-l-project__header > .vs-c-site-logo > .vs-c-site-sign')
 },
 get allOrganization () {
     return cy.get(".vs-l-project__header > .vs-c-site-logo")
 },
 get addNew(){
     return cy.get(".vs-c-list-btn--new-workspace > span")
 },
 get addOrganizationMenuItem () {
     return cy.get ("li:nth-of-type(1) > a > span")
 },
 get addBoarMenuItem (){
     return cy.get("li:nth-of-type(2) > a > span")
 },
 get importBoardFromMenuItem (){
 return cy.get("li:nth-of-type(3) > a > span")
 },
 get addNewBoard (){
     return cy.get (" .vs-c-list-btn--add-new>span:first-of-type")
 },
 get account(){
     return cy.get(".el-dropdown-link")
 },
 get user(){
     return cy.get( "a[href='/account/settings']")
 }
}
