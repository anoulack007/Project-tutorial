const mongoose = require('mongoose');
const staffModel = new mongoose.Schema({
    profileId:{
        type:mongoose.Schema.Types.ObjectId, ref:'Profile'
    },
    create_by_name:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    is_online:{
        type:Boolean,
        default:true
    },
    is_active_status:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports = mongoose.model('Staff', staffModel)