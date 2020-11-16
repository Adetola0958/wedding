const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session      = require('express-session') 
const mongoose = require("mongoose")
const dotenv   = require("dotenv").config()
const passport     = require('passport')
const LocalStrategy = require('passport-local')
const flash     =  require('connect-flash') 
const helmet   = require("helmet")

const MongoDBStore = require('connect-mongodb-session')(session)
const indexRouter = require('./routes/index');
const app = express();
const store = new MongoDBStore({
  uri :"mongodb://127.0.0.1:27017/wedding", 
  collection : "sessions"
}) 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
	cookie : {
		maxAge : 864e5
	} , 
	secret : process.env.SESSION_SECRET ,   
  resave : false , 
  store : store , 
	saveUninitialized : true , 
	unset : "destroy" , 
	genid : (req) => {
		return req.url
	}
	
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
/**
  Configure passport 
*/

passport.serializeUser(function(user , done) {
	done(null , user._id) 
})
passport.deserializeUser(function(id , done){
	User.findById(id , function(err , user) {
		done(err , user)
	})
})


app.use('/', indexRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const CONFIG = { 
	uri : "mongodb://127.0.0.1:27017/wedding" , 
  OPTIONS : { 
    useNewUrlParser : true , 
    useCreateIndex : true , 
    poolSize : 10 , 
    keepAlive : true , 
    useUnifiedTopology : true , 
    keepAliveInitialDelay : 3e6
  }
}

//let mongoUrl = "mongodb+srv://adeleke:2421994ade@naija-swag-k5j0g.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
//db.on('error' , console.error.bind(console , 'MongoDB connection error'))
//db.on('open' , console.info.bind(console , 'Connection to the database was ok'))
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


