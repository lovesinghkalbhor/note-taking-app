var jwt = require('jsonwebtoken');

// middleware that check for authentication of user by token
const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    try{
   let data =  jwt.verify(token, 'shhhhh');
  
   req.user = data._id
   next()
    }catch(error){
        res.status(401).send({error:"please authenticate using valid token"})
    }
     

}
module.exports = fetchuser