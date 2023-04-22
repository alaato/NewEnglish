const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else
    {
        req.flash('error', 'You must be logged in');
        res.redirect('/login');
    }
}

const isnotLogedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    else
    {
        res.redirect('/');
    }
}
const UserExists = async(req, res, next) => {
    const User = req.user;
    if (!User)
    {
        req.flash('error','sign in first, please');
        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    }
    else
    {
        next();
    }
}
const UserHasCourse = async(req, res, next) => {
    try {
        const {title} = req.params
        const User = req.user;
        await User.populate('subscribedCourses')
        console.log(User.subscribedCourses)
        if (User.subscribedCourses.length !=0)
        {
            for (let course of User.subscribedCourses)
        {

            if (course.title === title)
            { 
                return next();
            }
            
        }
    }
        req.flash('error','You have to Enroll to continue');
        res.redirect(`/course/${title}`);
        
    } catch (error) {
        console.log(error)
    }
    
        
}
module.exports = {UserExists, isLoggedIn, UserHasCourse};