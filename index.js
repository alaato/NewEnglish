const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('./Models/users');
const course = require('./Models/courses');
const authRoute = require('./Routes/auth')
const CourseRoute = require('./Routes/courseRoute')
const commentRoute = require('./Routes/commentsRoute')
const nodemailer = require('nodemailer');
const ExpressError = require('./Util/ExpressError')

main().catch(err => console.log(err));

async function main() {
    try {
        console.log("connected to zno");
        await mongoose.connect('mongodb://127.0.0.1:27017/zno');
      } catch (error) {
        handleError(error);
      }
      mongoose.connection.on('error', err => {
        logError(err);
      });
}
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static( "public" ) );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  httpOnly: true,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

}))
app.use(flash());


app.use(passport.initialize())
app.use(passport.session())
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req,res,next)=>{

  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
 })

app.use('/course', CourseRoute);
app.use('/course/:title/lecture/:id', commentRoute);
app.use(authRoute);
app.get('/', async(req, res) => {
  const all = await course.find({});
  res.render('Courses/home', {all});
  })
  

  
app.all('*', (req, res, next)=>{
    next(new ExpressError('UH-OH\n NOTHING IS HERE, DEAR',404))
})
app.use((err, req, res,  next)=>
{
res.render('Partials/error',{err})
})

app.listen(3000, ()=> console.log('server is running'));

