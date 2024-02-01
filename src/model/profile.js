const mongoose = require('mongoose');
const profileModel = new mongoose.Schema({
    resIds:[{
        type:mongoose.Schema.Types.ObjectId, ref:'Responsibility'
        
    }],
    poId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Position'
    },
    roleId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Role'
    },
    firstName:{
        type:String,
        require:true
    },
    surName:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('Profile',profileModel)