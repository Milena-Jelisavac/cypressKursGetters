const data = require("../fixtures/data.json");
module.exports={
    get monthlyStarter(){
        return cy.get(".checked.vsp-c-switch-pricing-plan-option > p")
    },
    get starterAcount (){
        return cy.get(".vsp-c-pricing-plan-list.vsp-c-pricing-plan-list--monthly > li:nth-of-type(1) > a[title='Starter']")
    },
    get email (){
        return cy.get("[data-cy=sign-up-email-input]")
    },
    get password(){
        return cy.get("input[type='password']")
    },
    get numberOfUsers(){
        return cy.get("[name='number_of_users']")
    },
    get iAgreeCheckBox(){
        return cy.get("input[type=checkbox]")
    },
    get startYourFreeTrail(){
        return cy.get(".vs-u-text--left > .vs-c-btn")
    },

    register({email=data.registration.email, password=data.registration.password, numberOfUsers=data.registration.numberOfUser,
        iAgreeCheckBox=true}){
            if(email==""||password==''||numberOfUsers==''){
                this.startYourFreeTrail.click()
            } else if (iAgreeCheckBox==false) {
                this.email.should('be.visible').type(email)
                this.password.should('be.visible').type(password)
                this.numberOfUsers.should('be.visible').type(numberOfUsers)
                this.iAgreeCheckBox.click({ force: true })
                this.startYourFreeTrail.click()
            } else {
                this.email.should('be.visible').type(email)
                this.password.should('be.visible').type(password)
                this.numberOfUsers.should('be.visible').type(numberOfUsers)
                this.startYourFreeTrail.click()
            }
    }
}

   
