const mongoose = require('mongoose');
const profileModel = new mongoose.Schema({
    resIds:{
        type:mongoose.Schema.Types.ObjectId, ref:''
        
    },
    poId:{
        type:mongoose.SchemaType.Types.ObjectId, ref:''
    },
    roleld:{
        type:mongoose.SchemaType.Types.ObjectId, ref:''
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