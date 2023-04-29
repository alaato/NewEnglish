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
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const dbUrl = "mongodb+srv://snowflake:wT5wBkMHoKbCm4I2@cluster0.dpoq4pf.mongodb.net/?retryWrites=true&w=majority" || 'mongodb://127.0.0.1:27017/zno' 


main().catch(err => console.log(err));

async function main() {

        console.log("connected to zno");
        await mongoose.connect(dbUrl);
}
app.engine('ejs', engine)
app.set('view engine', ejs.renderFile)
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))

app.use(express.static( "public" ) );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret: 'thisshouldbeabettersecret!'
  }
});
store.on('error', err => console.log(err));

app.use(session({
  store:store,
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
const PORT = 10000
app.listen(PORT, ()=> console.log('server is running'));

