const mongoose = require('mongoose');

const { Schema } = mongoose

const CourseSchema = new Schema({
    title : String,
    price : Number,
    image: String,
    video: String,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
module.exports = mongoose.model('Course', CampgroundSchema)
