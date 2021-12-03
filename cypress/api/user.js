
import endpoints from "../fixtures/endpoints.json"
import data from "../fixtures/data.json"
import color from "../support/consoleColor"

module.exports={
    login({email=data.user.email, password=data.user.password, statusCode=200, testMessage=""}){
        return cy.request({
            failOnStatusCode:false,
            method:"POST",
            url:endpoints.apiEndpoints.login,
            body:{
                email:email,
                password:password
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage}- Pass`, "success")
            : color.log(`${testMessage}- Fail ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eql(statusCode)
            return response.body.token
        })
    }
}