const express = require('express');
const router = express.Router();
const user = require('../Models/users');
const passport = require('passport');
router.get('/signup', (req, res) => {
    res.render('./authuntication/signup');
  })
router.post('/signup', async(req,res, next)=>{
    try {
        const {email, username, password} = req.body
        const User =  new user({email, username});
        const newUser = await user.register(User, password);    
        req.logIn(newUser, (err) => {
        if (err) {
            console.log(err);
        }
        req.flash('success', `welcome to our site ${username}`);
        res.redirect('/userinfo');    
    });
    } catch (error) {
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/signup')
    }
})

router.get('/login', (req, res) => {
    res.render('./authuntication/login');
});
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    keepSessionInformation: true}), (req, res) => {
        console.log(res.locals.success)
        req.flash('success', `welcome to our site ${req.user.username}`);
        res.redirect('/userinfo');

})
router.post('/logout', (req, res) => {
    req.logout((err)=>
    {
        if (err) { return next(err) }
        req.flash('success', 'You are logged out');
        console.log(res.locals.success)
        res.redirect('/' )
    });
   
});

router.get('/userInfo', function(req, res) {
    res.render('./authuntication/userInfo');
  });
  module.exports = router;