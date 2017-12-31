var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User     = require('./models/user');

// create database connection
mongoose.connect("mongodb://lisa:lisa@ds048368.mlab.com:48368/users-db");

var app = express();
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, '/static')));

var router = express.Router();
router.use(function(req, res, next) {
    // do logging
    console.log('Server running ' + req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// get all users (accessed at GET http://localhost:8080/users)
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err)  {
            console.log(err);
            res.status(400).send("Error");
        }
        else {
            res.json(users);
        }
    })
});

// create user (accessed at POST http://localhost:8080/users)
router.post('/', function(req, res) {
    var user = new User();
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.title = req.body.title;
    user.gender = req.body.gender;
    user.age = req.body.age;

    user.save(function(err) {
        if (err)   res.send(err);
        else       res.send("user created");
    })
});

// get user by id (accessed at GET http://localhost:8080/users/:user_id)
router.get('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)  {
            console.log(err);
            res.status(400).send("Error");
        }
        else  {
            if (!user)   res.status(400).send("User not found");
            else         res.json(user);
        }
    });
});

// update user by id (accessed at PUT http://localhost:8080/users/:user_id)
router.put('/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)   res.send(err);
        else   {
            user.fName = req.body.fName || user.fName;
            user.lName = req.body.lName || user.lName;
            user.title = req.body.title || user.title;
            user.gender = req.body.gender || user.gender;
            user.age = req.body.age || user.age;

            user.save(function(err) {
                if (err)   res.send(err);
                else       res.send("User updated");
            })
        }
    })
});

// delete user by id (accessed at DELETE http://localhost:8080/users/:user_id)
router.delete('/:user_id', function(req, res) {
    User.remove({_id : req.params.user_id}, function(err, user) {
        if (err)  {
            console.log(err);
            res.status(400).send("Error");
        }
        else  {
            if (!user.n)   res.status(400).send("User not found");
            else           res.json("User deleted");
        }
    })
});

app.use('/users', router);

app.listen(port, function() {
    console.log('Express App started');
});