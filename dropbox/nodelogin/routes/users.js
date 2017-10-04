var express = require('express');
var router = express.Router();
var mysql = require('./mysql');


/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', function (req, res) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;

    // check user already exists
    var getUser="select * from users where username='"+reqUsername+"' and password='" + reqPassword +"'";
    console.log("Query is:"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                req.session.username = reqUsername;
                console.log("valid Login");
                res.status(201).json({message: "Login successful"});
            }
            else {

                console.log("Invalid Login");
                res.status(401).json({message: "Login failed"});
            }
        }
    },getUser);

});


router.post('/signup', function (req, res) {

    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var reqfirstname = req.body.firstName;
    var reqlastname = req.body.lastName;
    var reqemail = req.body.email;
    var reqcontact = req.body.contactNo;

    // check user already exists
    var insertUser="insert into users (firstname, lastname, username, password, email, phno) values ( '"+reqfirstname
        +"' ,'" + reqlastname +"','" + reqUsername +"','" +
        reqPassword+ "','" + reqemail+ "','" + reqcontact+"')";

    console.log("Query is:"+insertUser);

    mysql.insertData(insertUser);
    res.status(201);
});


//Logout the user - invalidate the session
router.post('/logout', function (req, res) {

    req.session.destroy();
    console.log('Session destroyed');

});

module.exports = router;
