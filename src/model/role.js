const mongoose = require('mongoose');
const roleModel = new mongoose.Schema({
    roName:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports = mongoose.model('Role',roleModel)