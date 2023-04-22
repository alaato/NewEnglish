const { Schema, model } = require('mongoose')

const CommentSchema = new Schema({
    text : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    replies : [{
        type : Schema.Types.ObjectId,
        ref : 'replies'
    }],
    video : {
        type : Schema.Types.ObjectId,
        ref : 'video'
    },
    likes : Number,
    date: {
        type: Date,
        default: Date.now
      }
})

module.exports = model('comment', CommentSchema)

 