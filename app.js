const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
const {mongoDbUrl} = require('./config/database');
const passport = require('passport');


mongoose.Promise = global.Promise;


mongoose.connect(mongoDbUrl).then(db =>{

    console.log('Connection to DB Successful!!');

}).catch(error=> console.log(error));


app.use(express.static(path.join(__dirname, 'public')));


const {select, generateDate, paginate} = require('./helpers/handlebars-helpers');
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate, paginate: paginate}}));
app.set('view engine', 'handlebars');

app.use(upload());


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(methodOverride('_method'));

app.use(session({

    secret: 'edwindiaz123ilovecoding',
    resave: true,
    saveUninitialized: true

}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next)=>{

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');

    res.locals.form_errors = req.flash('form_errors');

    res.locals.error = req.flash('error');

    next();
});

const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');
const comments = require('./routes/admin/comments');

app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);

const port = process.env.PORT || 7000;

app.listen(port, ()=>{

console.log('now listening on port: ', port);

});