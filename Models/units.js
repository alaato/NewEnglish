const { Schema, model } = require('mongoose')

const UnitSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    course:
    {
        type : Schema.Types.ObjectId,
        ref: 'course',
    },
    order : Number,
    video :[ {
        type : Schema.Types.ObjectId,
        ref : 'video'
    },]
})



module.exports = model('unit', UnitSchema)