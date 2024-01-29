const express = require('express')
const app = require('./src/routes/app')
require('./src/database')

app.use(express.json());
app.use(express.urlencoded);
const PORT = 4000;

app.use((request,next)=>{
    console.log(`${request.method}:${request.url}`);
    next();
})
app.listen(PORT,()=>console.log(`Running Server On Port ${PORT}!!`))