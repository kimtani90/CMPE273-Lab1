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



router.get('/',  function (req, res) {

    var resArr = [];

    glob("public/uploads/"+req.params.email, function (er, files) {
        console.log(files);
        var resArr = files.map(function (file) {
            console.log(file);
            var imgJSON = {};
            imgJSON.img = file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });


        res.status(200).send(resArr);
    });

});

router.post('/delete', function (req, res) {

    console.log(req.body);
    var isfile = req.body.isfile;
    var filepath= req.body.filepath;

    var deleteUserFile="delete from userfiles where filepath = '"+filepath+"'";
    console.log("Query deleteFile is:"+deleteUserFile);

    mysql.executeQuery(function(err){
        if(err){
            res.send({"status":401});
        }
        else
        {
            var deleteFile="delete from files where filepath = '"+filepath+"'";
            console.log("Query deleteFile is:"+deleteFile);


            mysql.executeQuery(function(err){
                if(err){
                    console.log("Error: data not deleted from userfiles")
                }
                else
                {
                    console.log("data deleted from userfiles")

                }
            },deleteFile);

            if(isfile=='F')
                fs.rmdirSync(filepath);
            else
                fs.unlinkSync(filepath);


            res.send({"status":204});
        }
    },deleteUserFile);
});

router.post('/upload', upload.single('mypic'), function (req, res) {

    var splitedemail = req.body.email.split('.')[0];
    console.log(req.body);
    var filename = req.file.filename;
    var filepath = './public/uploads/'+splitedemail+'/'+req.file.filename;
    var fileparent = req.body.fileparent;
    var isfile = req.body.isfile;


    var filedata={
        'filename': filename,
        'filepath':filepath,
        'fileparent': fileparent,
        'isfile': isfile
    };

    //copying a file to user's folder
    fs.createReadStream('./public/uploads/'+req.file.filename).pipe(fs.createWriteStream(filepath));

    // check user already exists
    var insertFile="insert into files (filename, filepath, fileparent, isfile) values ( '"+filename
        +"' ,'" + filepath+"' ,'" + fileparent+"','" + isfile+"')";

    console.log("Query is:"+insertFile);


    mysql.executeQuery(function(err){
        if(err){
            res.send({"status":401});
        }
        else
        {
            var insertUserFile="insert into userfiles  (filepath, email)  values ( '"+filepath+"' ,'" + req.body.email+"')";
            console.log("Query insertUserFile is:"+insertUserFile);


            mysql.executeQuery(function(err){
                if(err){
                   console.log("Error: data not inserted in userfiles")
                }
                else
                {
                    console.log("data inserted in userfiles")

                }
            },insertUserFile);
            console.log(filedata)

            res.send({"filedata":filedata, "status":204});
        }
    },insertFile);



});







router.post('/makefolder', function (req, res) {

    var splitedemail = req.body.email.split('.')[0];
    console.log(req.body);
    var filename = req.body.folder.foldername;
    var filepath = './public/uploads/'+splitedemail+'/'+filename;
    var fileparent = req.body.folder.fileparent;
    var isfile = req.body.folder.isfile;


    var folderdata={
        'filename': filename,
        'filepath':filepath,
        'fileparent': fileparent,
        'isfile': isfile
    };

    var dir = './public/uploads/'+splitedemail+'/'+filename;

    if (!fs.existsSync(dir)){

        fs.mkdirSync(dir);
    }
    // check user already exists
    var insertFile="insert into files (filename, filepath, fileparent, isfile) values ( '"+filename
        +"' ,'" + filepath+"' ,'" + fileparent+"','" + isfile+"')";

    console.log("Query is:"+insertFile);


    mysql.executeQuery(function(err){
        if(err){
            res.send({"status":401});
        }
        else
        {
            var insertUserFile="insert into userfiles  (filepath, email)  values ( '"+filepath+"' ,'" + req.body.email+"')";
            console.log("Query insertUserFile is:"+insertUserFile);


            mysql.executeQuery(function(err){
                if(err){
                    console.log("Error: data not inserted in userfiles")
                }
                else
                {
                    console.log("data inserted in userfiles")

                }
            },insertUserFile);

            res.send({"folderdata":folderdata, "status":204});
        }
    },insertFile);



});



router.post('/sharefile', function (req, res) {

    console.log(req.body);
    var userEmail=req.body.email;
    var shareEmail= req.body.filedata.shareEmail;
    var file=req.body.filedata.file;
    var splitedemail = shareEmail.split('.')[0];
    var splitUserEmail = userEmail.split('.')[0];

    var filename = file.filename;
    var filepath = './public/uploads/'+splitedemail+'/'+file.filename;
    var fileparent = file.fileparent;
    var isfile = file.isfile;


    var filedata={
        'filename': filename,
        'filepath':filepath,
        'fileparent': fileparent,
        'isfile': isfile
    };

    //copying a file to user's folder
    fs.createReadStream('./public/uploads/'+splitUserEmail+'/'+filename).pipe(fs.createWriteStream(filepath));

    // check user already exists
    var insertFile="insert into files (filename, filepath, fileparent, isfile) values ( '"+filename
        +"' ,'" + filepath+"' ,'" + fileparent+"','" + isfile+"')";

    console.log("Query is:"+insertFile);


    mysql.executeQuery(function(err){
        if(err){
            res.send({"status":401});
        }
        else
        {
            var insertUserFile="insert into userfiles  (filepath, email)  values ( '"+filepath+"' ,'" + shareEmail+"')";
            console.log("Query insertUserFile is:"+insertUserFile);


            mysql.executeQuery(function(err){
                if(err){
                    console.log("Error: data not inserted in userfiles")
                }
                else
                {
                    console.log("data inserted in userfiles")

                }
            },insertUserFile);

            res.send({"status":201});
        }
    },insertFile);



});



module.exports = router;
