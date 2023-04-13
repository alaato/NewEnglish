const { Schema, model } = require('mongoose')

const QuestionsSchema = new Schema({
    question : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'users'
    },
    replies : [{
        type : Schema.Types.ObjectId,
        ref : 'replies'
    }],
    video : {
        type : Schema.Types.ObjectId,
        ref : 'videos'
    },
    likes : Number,
    date: Date
})

const Questions = model('questions', QuestionsSchema)

module.exports = Questions