const express = require('express')
const app = require('./src/routes/app')
require('./src/database')

app.use(express.json())
app.use(express.urlencoded())
const PORT = 30