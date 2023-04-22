const user = require('../Models/users')

const verifyUser = async(req, res, next) => {
    try {
        console.log(req.session)

        const {email} = req.body
        const User = await user.findOne({email: email})
        if (User && User.confirmed === true)
            {
                next();
            }
        else
        {
            req.flash('error', 'verify Your Account')
            res.redirect('/login');

        }
    } catch (error) {
        req.flash('error', 'verify');
        console.log(error)
    }
    



}
module.exports = verifyUser