import endpoints from "../fixtures/endpoints.json"
import data from "../fixtures/data.json"
import color from "../support/consoleColor"

module.exports={
    get({ token = "", orgId="" }) {
        return cy.request({
            failOnStatusCode:false,
            method: "GET",
            url: `${Cypress.env("baseApi")}organizations/${orgId}/boards-data`,
            headers: {
              Authorization: `Bearer ${token}`,
                },
          })
          .then((response) => {
            expect(response.status).to.eql(200);
            return response.body;
          });
      },
    post({name, orgId, type="scrum_board", token="",confBoardId=null, teamMembers=null, testMessage="", statusCode=201}){
        return cy.request({
            failOnStatusCode:false,
            method:"POST",
            url:endpoints.apiEndpoints.board,
            body:{
                name:name,
                configuration_board_id: confBoardId,
                team_members_board_id: teamMembers,
                organization_id:orgId,
                type:type
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

    put({token="", boardId="", code=code, description=null, boardName="", statusCode=200, testMessage="" }) {
        return cy.request({
            failOnStatusCode:false,
            method:"PUT",
         
            url:`${Cypress.env("baseApi")}boards/${boardId}`,
            body:{
                code:code,
                description:description,
                name: boardName,
                task_unit: "points"
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
    delete({token="", statusCode=200,boardId="", testMessage=""}){
        return cy.request({
            failOnStatusCode:false,
            method:"DELETE",
            url:`${Cypress.env("baseApi")}boards/${boardId}`,
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
    }
}