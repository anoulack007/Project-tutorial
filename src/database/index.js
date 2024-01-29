const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://iquri:iquri95446605@cluster.3xtlzlf.mongodb.net/Aiy_Phoumy')
    .then(()=>console.log('Connected to DB'))
    .catch ((err)=>console.log(err))