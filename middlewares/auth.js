const comment = require('../Models/comment')
const reply = require('../Models/reply')
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
const isCommentAuthor = async(req, res, next) => {
    try {
        console.log(session)
    const {review_id} = req.params;
    const Comment = await comment.findById(review_id)
    if(Comment.author.id == req.user.id)
    {
        next();
    }
    else
    {
        console.log(comment.author.id, req.user.id)
        req.flash('error','You dont have the permission to do so')
        res.redirect('/');
    }
    } catch (error) {
        console.log(error)
    }
    

}
const isreplyAuthor = async(req, res, next) => {
    const {reply_id} = req.params;
    const Reply = await reply.findById(reply_id)
    if(Reply.author.id == req.user.id)
    {
        next();
    }
    else
    {
        req.flash('error','You dont have the permission to do so')
        res.redirect('/');
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
module.exports = {UserExists, isLoggedIn, UserHasCourse, isCommentAuthor, isreplyAuthor};