var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mysql = require('./mysql');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
        cb(null, file.originalname)


    }
});

var upload = multer({storage:storage});


/* GET users listing. */
router.get('/', function (req, res) {



    /*var filename = req.body.username;
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


*/





    var resArr = [];

    glob("public/uploads/*", function (er, files) {
console.log(files);
        var resArr = files.map(function (file) {
            console.log(file);
            var imgJSON = {};
            imgJSON.img = file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });

});

router.post('/upload', upload.single('mypic'), function (req, res) {

    console.log(req.file); //file details


    var fileName = req.file.filename;
    var fileLocation = req.file.path;


    // check user already exists
    var insertFile="insert into Files (filename, filelocation) values ( '"+fileName
        +"' ,'" + fileLocation+"')";

    console.log("Query is:"+insertFile);

    mysql.insertData(insertFile);

            res.status(204).end();
});

module.exports = router;
