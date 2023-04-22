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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    confirmed:
    {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(mongoosepassport, {usernameField: 'email',
errorMessages: {
    UserExistsError: 'This email address is already registered'
  } });
module.exports = mongoose.model('user', userSchema);