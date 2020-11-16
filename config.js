/**
  * Non-secured configuration settings 
*/
const dotenv = require('dotenv').config() 
const MONGO_URL = process.env.MONGO_DEVELOPMENT_URL
const MONGO_OPTIONS = {
	URL : "mongodb://127.0.0.1:27017/wedding", 
    OPTIONS : {
	    useNewUrlParser : true , 
	    useCreateIndex : true , 
	    poolSize : 10 , 
	    keepAlive : true , 
	    useUnifiedTopology : true ,
	    keepAliveInitialDelay : 300000
	}
}
module.exports = MONGO_OPTIONS