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
    course :{
        type : Schema.Types.ObjectId,
        ref : 'course'
    },
    questions : [{
        type : Schema.Types.ObjectId,
        ref : 'questions'
    }]
})

module.exports = model('videos', VideoSchema)

