const express = require('express');
const router = express.Router();
const user = require('../Models/users');
const passport = require('passport');
const Token = require("../Models/token");
const sendEmail = require('../Util/sendEmail');
const {UserExists, isLoggedIn, verifyUser} = require('../middlewares/auth');

router.get('/signup', (req, res) => {
    res.render('./authuntication/signup');
  })
router.post('/signup', async(req,res, next)=>{
    try {
        const {email, username, password} = req.body
        const User =  new user({email, username});
        const newUser = await user.register(User, password);
        let token = await new Token({
            userId: User._id,
            token: require('crypto').randomBytes(64).toString('hex'),
          }).save();
          const message = `https://newenglsih.onrender.com/verify/${User.id}/${token.token}`;
          console.log(User);
    await sendEmail(User.email, "Verify Email", message);
    req.flash('success',"email was sent successfully, please verify your email")
    res.redirect('/login')

    } catch (error) {
        console.log(error);
        req.flash('error', error.message);
        res.redirect('/signup')
    }
})
router.get("/verify/:id/:token", async (req, res) => {
    try {
      const {id} = req.params;
      const User = await user.findById(id);
      if (!User) return res.status(400).send("Invalid link");
      const token = await Token.findOne({
        userId: User.id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link");
  
      await user.findOneAndUpdate({ _id: User.id}, {confirmed: true });
      await Token.findByIdAndRemove(token._id);
  
      req.flash('success','email verfied, you may log in now')
      res.redirect('/login')
    } catch (error) {
      console.log(error);
      res.status(400).send("An error occured");
    }
  });
  

router.get('/login', async(req, res) => {
    res.render('./authuntication/login');
});
router.post('/login',verifyUser,passport.authenticate('local', {keepSessionInfo: true,
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true,
    }), (req, res, next) => {
        req.session.user = req.user;
        req.flash('success', `welcome to our site ${req.user.username}`);
        const redirect = req.session.returnTo||'/userinfo'
        res.redirect(redirect );

})
router.post('/logout', isLoggedIn,(req, res) => {
    req.logout((err)=>
    {
        if (err) { return next(err) }
        req.flash('success', 'You are logged out');
        res.redirect('/' )
    });
   
});

router.get('/userInfo', UserExists ,async(req, res)=> {
  const User = req.user
  await User.populate('subscribedCourses')
  res.render('./authuntication/userInfo', {User});
});
  module.exports = router;