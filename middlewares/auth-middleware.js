import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'

export const userAuthentication=async(req,res,next)=>{
    let token
    const {authorization}=req.headers   
    if(authorization && authorization.startsWith('Bearer')){
        try{
          token=authorization.split(' ')[1]

          //verify token
          const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)

          //Get user from token
          req.user=await UserModel.findById(userID).select('-password')
          next()
        }catch{
            res.status(401).send({"status":"failed","message":"Unauthorized User"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"No Token, Unauthorized User"})
    }    
}

export const checkAdminAuth=async(req,res,next)=>{
    let token
    const {authorization}=req.headers   
    if(authorization && authorization.startsWith('Bearer')){
        try{
          token=authorization.split(' ')[1]

          //verify token
          const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)

          //check admin
          const user = await UserModel.findById(userID)
          if(user.isAdmin){
            //Get admin from token
            req.user=await UserModel.findById(userID).select('-password')
            next()
          }else{
            res.status(401).send({"status":"failed","message":"Role is not admin"})
          }
         
        }catch{
            res.status(401).send({"status":"failed","message":"Unauthorized User"})
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","message":"No Token, Unauthorized User"})
    }    
}
