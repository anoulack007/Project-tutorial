const jwt = require("jsonwebtoken");
require("../routes/app");
const account = require('../model/account');
const staff = require("../model/staff");
const config = process.env;

const jwtGenerate = (account) =>{
    const accessToken = jwt.sign(
        {userName: account.userName, id: account._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"30m"}
    )
    return accessToken
}
const jwtRefreshTokenGenerate = (account)=>{
    const refreshToken = jwt.sign(
        {userName: account.userName,id:account._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1d"}
    )
    return refreshToken
}
const jwtValidate = async (request,response, next) =>{
    try{
    if(!request.headers["authorization"]) return response.sendStatus(401)
    const token = request.headers["authorization"].split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    //
    const user = await account.findOne({userName:decoded.userName})
    const user1 = await staff.findOne({userName:decoded.userName})
    console.log(user1)
    if(!user1 && !user) return response.sendStatus(401)
    request.userName = decoded.userName
    next()
    }catch(error) {
    return response.sendStatus(403)
  }
}

const jwtRefreshTokenValidate = async(request,response,next)=>{
    try{
    if(!request.headers["authorization"]) return response.sendStatus(401)
    const token = request.headers["authorization"].split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const user = await account.findOne({userName:decoded.userName})
    const user1 = await staff.findOne({userName:decoded.userName})
    if(!user1 && !user) return response.sendStatus(401)
    request.staff = decoded.userName
    next()
    }catch(err){return response.sendStatus(403)}
}
  

module.exports = {
    jwtGenerate,
    jwtRefreshTokenGenerate,
    jwtValidate,
    jwtRefreshTokenValidate

}