import userAPi from "../api/user"
import organizationAPI from "../api/organization"
import boardAPI from "../api/board"
import data from "../fixtures/data.json"

describe('Board regresion', ()=>{
        let userToken
        let organizationID
    before("Login, setting token and creating organizing and setting id",()=>{
     userAPi.login({testMessage:"Login before other test"}).then((token)=>{
         userToken=token
            return organizationAPI.post({token:userToken, testMessage:"Creating organization"}).then((organizationObject)=>{
                return organizationID=organizationObject.id
            })
        })
    })
    after ("Delete all boards", ()=>{
        boardAPI.get({token:userToken, orgId:organizationID}).then((allBoard)=>{
            allBoard.forEach((board)=>{
                boardAPI.delete({token:userToken, boardId:board.id})
            })
        })       
    })
    let boardID
    let code
    let boardName
   
    it("Creating board without name", ()=>{
        boardAPI.post({
            token:userToken,
            orgId:organizationID, 
            testMessage:"Create board without name",
            statusCode:400
        })
    })
    it("Creating board with only space", ()=>{
        boardAPI.post({
            name:"    ",token:userToken, statusCode:400, orgId:organizationID, testMessage:"Creating board with only space"
        })
    })
    it("Create board ",()=>{
        boardAPI.post({name:"New board", token:userToken, orgId:organizationID, testMessage:"Create board"}).then((response)=>{
            code=response.code
            boardID=response.id
            boardName=response.name
        })
    })
    it("Edit board- name with all space", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:code, boardName:"   ", statusCode:400, testMessage:"Edit board- name with all space"})
    })
    //Do to : check validation form max number of characters in name
    // Expected result: statusCode 400 , Actual : statusCode:200
    it("Edit board- Edit board name more than 50 characters", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:code, boardName:data.negativData.string256characters, statusCode:200, testMessage:"Edit board- Edit board name more than 50 characters"})
    })
    it("Edit board- empty name", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:code, boardName:"", statusCode:400, testMessage:"Edit board- empty name"})
    })
    // Expected result: statusCode 400 , Actual : statusCode:500
    it("Edit board- no code", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:"", boardName:boardName, statusCode:500, testMessage:"Edit board- no code"})
    })
    // Expected result: statusCode 400 , Actual : statusCode:500
    it("Edit board-code empty space", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:"    ", boardName:boardName, statusCode:500, testMessage:"Edit board-code empty space"})
    })
    it("Edit board-more than 4 characters", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:data.negativData.string256characters, boardName:boardName, statusCode:400, testMessage:"Edit board-more than 4 characters"})
    })
    it("Successful Edit board-code", ()=>{
        boardAPI.put({token:userToken, boardId:boardID, code:"3344", boardName:boardName, testMessage:"Successful Edit board-code"})
    })
    let allBoard
    it ("Get all boards",()=>{
        boardAPI.get({token:userToken, orgId:organizationID}).then((response)=>{
            allBoard=response
        })
    })
    // it("Delete board", ()=>{
    //     boardAPI.delete({token:userToken, boardId:boardID})
    // })
})
