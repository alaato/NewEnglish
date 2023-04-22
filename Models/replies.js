const { Schema, model } = require('mongoose')

const QuestionsSchema = new Schema({
    reply : {
        type : String,
        required : yes
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    likes : Number,
    date: Date
})

const replies = model('replies', QuestionsSchema)

module.exports = replies