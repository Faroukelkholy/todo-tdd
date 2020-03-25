const mongoose = require("mongoose");


async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/myapp', {useUnifiedTopology: true, useNewUrlParser: true});

    }catch(err){
        console.error("error connecting to mongo :",err)
    }
}

module.exports = {connect};