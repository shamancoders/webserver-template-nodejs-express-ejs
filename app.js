var createError = require('http-errors')
var express = require('express')
var session = require('express-session')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var engine = require('ejs-locals')
var logger = require('morgan')
var favicon = require('serve-favicon')
var methodOverride = require('method-override')

global.app = express()

var cors = require('cors')
app.use(cors())

app.use(favicon(path.join(__root, 'assets/img/logo.png')))

// view engine setup
app.engine('ejs', engine)
app.set('views', path.join(__root, 'pages'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 50000 }))
// app.use('/assets',express.static(path.join(__dirname, 'assets'), { maxAge: (60 * 1000 * 60 * 24 * 30) }))
app.use('/assets',express.static(path.join(__root, 'assets')))
app.use(cookieParser())

app.set('trust proxy', 1)
app.use(session({
	secret: 'hello world',
	resave: false,
	saveUninitialized: true,
	name: app.get('name'),
	cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
}))



require(path.join(__root, '/routes/routes'))(app)

if(process.env.NODE_ENV!='development'){
  process.on('uncaughtException', function(err) {
		errorLog('Caught exception: ', err)
	})
}

module.exports = () => {
	require(path.join(__root, '/lib/http-server'))(app, (err, server, port) => {
		if(!err) {
			require(path.join(__root, '/routes/routes'))(app)
		} else {
			errorLog(err)
		}
	})

}
