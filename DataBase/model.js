const mongoose=require('mongoose')

const wordSchema=mongoose.Schema({
    Words: {
        type: Array
    }
})


module.exports=mongoose.model("word",wordSchema);