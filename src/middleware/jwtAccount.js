const jwt = require("jsonwebtoken");
require("../routes/app");
const account = require('../model/account');
const config = process.env;

const jwtGenerate = (acc) =>{
    const accessToken = jwt.sign(
        {userName: acc.userName, id: acc._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"30m", algorithm:"HS256"}
    )
    return accessToken
}
const jwtRefreshTokenGenerate = (acc)=>{
    const refreshToken = jwt.sign(
        {userName: acc.userName,id:acc._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:"1d",algorithm:"HS256"}
    )
    return refreshToken
}
const jwtValidate = async (request,response, next) =>{
    if(!request.headers["authorization"]) return response.sendStatus(401)
    const token = request.headers["authorization"].split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await account.findOne({userName:decoded.userName})
    if(!user) return response.sendStatus(401)

    request.Use = decoded.userName
    next()
}
const jwtRefreshTokenValidate = async(request,response,next)=>{
    try{
    if(!request.headers["authorization"]) return response.sendStatus(401)
    const token = request.headers["authorization"].split("Bearer ")[1]
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    const use = await account.findOne({userName:decoded.userName})
    if (!use) return response.sendStatus(401)
    request.Use = decoded.userName
    next()
    }catch(err){return response.sendStatus(403)}
}
  

module.exports = {
    jwtGenerate,
    jwtRefreshTokenGenerate,
    jwtValidate,
    jwtRefreshTokenValidate

}