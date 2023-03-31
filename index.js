const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const engine = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({secret: 'keyboard', resave: false, saveUninitialized: false}));

app.use(express.static( "public" ) );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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



app.get('/', (req, res) => {
    res.render('Courses/home');
  })
  app.get('/course/:coursename', (req, res) => {
    res.render('Courses/courseinfo');
  })
  app.get('/course/:coursename/:id', (req, res) => {
    res.render('Courses/courseshow');
  })

  app.get('/signup', (req, res) => {
    res.render('authuntication/signup');
  })
app.get('/login', (req, res) => {
    res.render('authuntication/login');
  })
  app.post('/login', function(req, res) {
  res.redirect('/userInfo' )
   
  });
  app.get('/userInfo', function(req, res) {

    res.render('authuntication/userInfo');
  

  });
app.listen(3000, ()=> console.log('server is running'));

