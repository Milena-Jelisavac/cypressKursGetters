import faker from "faker"
import color from "../support/consoleColor"


module.exports={
    get({token=""}){
        return cy.request({
            failOnStatusCode:false,
            method:"GET",
            url:"https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            return response.body
        })
    },
    post({
        orgName= faker.animal.crocodilia(),
        token="",
        statusCode=200,
        testMessage=""
    }) {
        return cy.request({
            failOnStatusCode:false,
            method:"POST",
            url:"https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body:{
                name:orgName,
            },
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage}- Pass`, "success")
            : color.log(`${testMessage}- Fail ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eql(statusCode)
            return response.body
        })
    },
    delete({
        orgId="",
        token="",
        statusCode=201,
        testMessage="",
        password="Test1234"
    }) {
         cy.request({
            failOnStatusCode:false,
            method:"POST",
            url:`https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body:{
                passwordOrEmail:password,
            },
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage}- Pass`, "success")
            : color.log(`${testMessage}- Fail ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eql(statusCode)
            
        })
    },
    edit(token="", orgId="",name="Novi naslov", statusCode=200,
    testMessage=""){
        cy.request({
        failOnStatusCode:false,
        method: "PUT",
        url:`https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
        body:{
            name:name,
        },
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response)
        typeof response.status !== "undefined" &&
        response.status === statusCode
        ? color.log(`${testMessage}- Pass`, "success")
        : color.log(`${testMessage}- Fail ${JSON.stringify(response)}`, "error");
        //expect(response.status).to.eql(statusCode)
        
    })
   
    }
}