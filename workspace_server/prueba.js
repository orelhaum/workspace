const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

let fields =  {
  usernameField: 'username',
  passwordField: 'password'
}

let loginFunction = (username, password, done) => {
  if ((username === 'usuario') && (password === 'password')) {
    return done(null, {username, loginDate: new Date()});
  }
  return done(null, false, { message: 'Incorrect username.' });
}

passport.use(new LocalStrategy(fields, loginFunction));

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
  res.end('home');
});

app.get('/login', (req, res) => {
  if (req.session) console.log(req.session.user);	// { username: 'usuario', loginDate: ... }
  res.end('login');
});

app.post('/login', passport.authenticate(('local'), { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});
  
app.get('/logout', (req, res) => {
  // req.logout eliminará la propiedad req.user y borrará la sesión del usuario (si corresponde)
  req.logout();
  res.redirect('/');
});

app.listen(3000);