const { Schema, model } = require('mongoose')

const UnitSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    video :[ {
        type : Schema.Types.ObjectId,
        ref : 'videos'
    },]
})

const Units = model('questions', UnitSchema)

module.exports = Units