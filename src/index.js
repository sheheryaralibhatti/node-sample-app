const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'terraform-20201006141302000900000001.cluklqihxutl.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin123',
    port: 3306,
    database: 'sheheryar_nodejs_db'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
