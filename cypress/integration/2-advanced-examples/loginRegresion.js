import userAPi from "../../api/user"

describe('Api testing', ()=>{
   let userToken
    it("Positive login", ()=>{
        userAPi.login({testMessage:"Positive login"}).then((token)=>{
          userToken=token
    })  
    })
    it('Wrong email without @', ()=>{
        userAPi.login({email:"testgmail.com", message:"Wrong email without @", statusCode:401})
    })
    it('Wrong email without com', ()=>{
        userAPi.login({email:"test@test.", message:"Wrong email without com", statusCode:401})
    })
    it('Wrong email with space in front', ()=>{
        userAPi.login({email:"@test.", message:"Wrong email with space in front", statusCode:401})
    })
    it('Wrong email with space in back', ()=>{
        userAPi.login({email:"test@", message:"Wrong email with space in back", statusCode:401})
    })
})