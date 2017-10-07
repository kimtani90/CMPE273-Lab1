var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mysql = require('./mysql');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Hellloooonnnn")
        console.log(req.email);

        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
        cb(null, file.originalname)


    }
});

var upload = multer({storage:storage});



router.get('/', function (req, res) {

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

    console.log(req.body);
    var fileName = req.file.filename;
    var fileLocation = req.file.path;



    fs.createReadStream('./public/uploads/'+req.file.filename).pipe(fs.createWriteStream('./public/uploads/'+req.body.email+'/'+req.file.filename));

    // check user already exists
    var insertFile="insert into Files (filename, filelocation) values ( '"+fileName
        +"' ,'" + fileLocation+"')";

    console.log("Query is:"+insertFile);


    mysql.insertData(function(err){
        if(err){
            res.status(401).json({message: "File Error!"});
        }
        else
        {

            res.status(204).json({message: "File Uploaded Successfully!"});

        }
    },insertFile);

});

module.exports = router;
