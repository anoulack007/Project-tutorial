require('dotenv').config();
require('../database/index').connect();
const express = require('express');
const {registerAcc,loginAcc,refreshAcc,ReadAcc, ReadAcc1, UpdateAcc, deleteAccount} = require('../controllers/account')
const {CreateProfile,ReadManyProfile,ReadOneProfile,UpdateProfile,DeleteProfile} = require('../controllers/profile')
const {jwtValidate, jwtRefreshTokenGenerate,jwtRefreshTokenValidate} = require('../middleware/jwtAccount');
const account = require('../model/account');

const app = express();

app.use(express.json())
//account
app.post("/account/register",registerAcc)
app.post("/account/login",loginAcc)
app.post("/account/refreshToken",jwtRefreshTokenValidate,refreshAcc)
app.get('/account/read', jwtValidate,ReadAcc)
app.get('/account/read1/:id', jwtValidate,ReadAcc1)
app.put('/account/update/:id',jwtValidate,UpdateAcc)
app.delete('/account/delete/:id',jwtValidate,deleteAccount)
//profile
app.post("/profile/create",jwtValidate,CreateProfile)
app.get('/profile/read', jwtValidate,ReadManyProfile)
app.get('/profile/read1/:id', jwtValidate,ReadOneProfile)
app.put('/profile/update/:id',jwtValidate,UpdateProfile)
app.delete('/profile/delete/:id',jwtValidate,DeleteProfile)

module.exports = app;