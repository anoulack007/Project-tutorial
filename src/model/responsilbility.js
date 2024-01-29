const mongoose = require('mongoose')
const responsibilityModel = new mongoose.Schema({
    resName:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('Responsibility',responsibilityModel)