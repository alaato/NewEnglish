const { Schema, model } = require('mongoose')

const VideoSchema = new Schema({
    url : {
        type : String,
        
    },
    title : {
        type : String,
    
        trim : true
    },
    order: Number,
    unit :{
        type : Schema.Types.ObjectId,
        ref: 'unit'
    },
    course :{
        type : Schema.Types.ObjectId,
        ref : 'course'
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'comment'
    }]
})

module.exports = model('video', VideoSchema)

