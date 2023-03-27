const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');

app.use(session({secret: 'keyboard', resave: false, saveUninitialized: false}));

app.use(express.static( "public" ) );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch(err => console.log(err));

async function main() {
    try {
        console.log("connected g mongoose");
        await mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp');
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



app.get('/', (req, res) => {
    res.render('Courses/home');
  })
  app.get('/signup', (req, res) => {
    res.render('Courses/signup');
  })
app.get('/login', (req, res) => {
    res.render('Courses/login');
  })
  app.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    
  res.redirect('/userInfo' )
    // Check if username and password are correct
   
  });

  app.get('/userInfo', function(req, res) {
    // Check if user is logged in
    res.render('Courses/userInfo', { user: req.session.user });
  
    // Render user info page
    res.render('user-info', { user: req.session.user });
  });
app.listen(3000, ()=> console.log('server is running'));

