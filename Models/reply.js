const { Schema, model } = require('mongoose')
const moment = require('moment');

const ReplySchema = new Schema({
    text : {
        type : String,
        required : true
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    likes : [
      {
          type : Schema.Types.ObjectId,
          ref : 'user'
      }
  ],
    date: {
        type: Date,
        default: Date.now
      }
})
ReplySchema.virtual('formattedDate').get(function() {
    return moment(this.date).format('ddd, hA');
  });

  ReplySchema.virtual('ago').get(function() {
    const date = moment(this.date).format();
    return moment(date).fromNow();

  });

module.exports = model('reply', ReplySchema)
