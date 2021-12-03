import userAPi from "../api/user"
import organizationAPI from "../api/organization"
import boardAPI from "../api/board"

describe('Api testing', ()=>{
    let userToken
    before(()=>{
        userAPi.login({testMessage:"Login before other test"}).then((token)=>{
         userToken=token
    })
})
    after("Delete all organization",()=>{
        organizationAPI.get({token:userToken}).then((allOrg)=>{
            allOrg.forEach((organization)=>{
                 organizationAPI.delete({token:userToken, orgId:organization.id})
                     })
        })      
    
    })
    let organizationId
    it('Kreiranje organizacije', ()=>{
        organizationAPI.post({token:userToken, testMessage:"Kreiranje organizacije"}).then((organizationObject)=>{
            console.log(organizationObject)
            organizationId=organizationObject.id
        })
    })

    // it ('Delete organization', ()=>{
    //     organizationAPI.delete({token:userToken,orgId:organizationId})
    // })
    let allOrganization
    it('Get all organizations', ()=>{
        organizationAPI.get({token:userToken}).then((allOrg)=>{
            allOrganization=allOrg
            console.log(allOrg)
        })
    })
    it('Edit', ()=>{
        console.log(organizationId)
            organizationAPI.edit({token:userToken, orgId:7822})
      
        
    })
    
})