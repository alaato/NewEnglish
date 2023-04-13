const mongoose = require('mongoose');
const mongoosepassport = require('passport-local-mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    subscribedCourses: [{
        typeof: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

userSchema.plugin(mongoosepassport, {usernameField: 'email' });
module.exports = mongoose.model('user', userSchema);