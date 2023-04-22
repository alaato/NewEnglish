const mongoose = require('mongoose');

const { Schema } = mongoose

const CourseSchema = new Schema({
    author: String,
    title : String,
    price : Number,
    img: String,
    unit: [{
        type : Schema.Types.ObjectId,
        ref: 'unit'
    }],
    description: String,
    points: [String],
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reviews'
        }
    ],
    length: Number,
})
module.exports = mongoose.model('course', CourseSchema)
