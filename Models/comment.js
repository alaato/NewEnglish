const { Schema, model } = require('mongoose')
const moment = require('moment');

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
        ref : 'reply'
    }],
    video : {
        type : Schema.Types.ObjectId,
        ref : 'video'
    },
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : 'user'
        }
    ],
    date: {
        type: Date,
        default: Date.now,
      }
})
CommentSchema.virtual('formattedDate').get(function() {
    return moment(this.date).format('YYYY MM DD');
  });
CommentSchema.virtual('ago').get(function() {
    const date = moment(this.date).format();
    return moment(date).fromNow();
  });

module.exports = model('comment', CommentSchema)

 