
const data = require("../fixtures/data.json");
const navigationModule = require("../Module/navigationModule");
const sidbarModule = require("../Module/sidbarModule");
module.exports={
    get email(){
        return cy.get("input[type='email']")
    },
    get password(){
        return cy.get("input[type='password']")
    },
    get forgotPassword (){
        return cy.get("a[href='/forgot-password']")
    },
    get buttonLogin (){
        return cy.get("button[type='submit']")
    },
    get backToHomeLInk (){
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com/']")
    },
    get facebookButton (){
        return cy.get("button[class='vs-c-btn--fb']")
    },
    get googleButton (){
        return cy.get ("button[class='vs-c-btn--gp']")
    },
    get instagramButton (){
        return cy.get("button[class='vs-c-btn--tw']")
    },
    get rezgenButton (){
        return cy.get("button[class='vs-c-btn--regzen']")
    },
    get singUpLink (){
        return cy.get("a[href='https://cypress-api.vivifyscrum-stage.com/pricing']")
    },
    get errorMessage (){
        return cy.get(".vs-c-form-item__error-wrapper")
    },

    login({email=data.user.email, password=data.user.password}){
        if (email==""){
            this.password.should("be.visible").type(password)
            this.buttonLogin.click()
        } else if(password==""){
            this.email.should("be.visible").type(email)
            this.buttonLogin.click()
        } else {
            cy.intercept('POST', '**/api/v2/login').as('login')
            this.email.should("be.visible").type(email)
            this.password.should("be.visible").type(password)
            this.buttonLogin.click()
        if(email==data.user.email &&  password==data.user.password){
            cy.wait('@login').then((intercept)=>{
                expect(intercept.response.statusCode).to.eq(200)
            })
        }
        }
   },
   
    logout (){
        cy.intercept("POST", "**/api/v2/logout").as('logout')
        sidbarModule.account.should('be.visible').click()
        sidbarModule.user.should('be.visible').click()
        navigationModule.logoutButton.should('be.visible').click()
    }
}
