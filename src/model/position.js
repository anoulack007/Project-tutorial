const mongoose = require('mongoose')
const PositionModel = new mongoose.Schema({
    poName:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('Position',PositionModel)