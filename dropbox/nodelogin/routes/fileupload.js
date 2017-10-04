var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
        cb(null, Date.now()+'-'+file.originalname)


    }
});

var upload = multer({storage:storage});


/* GET users listing. */
router.get('/', function (req, res) {
    var resArr = [];

    glob("public/uploads/*", function (er, files) {

        var resArr = files.map(function (file) {
            var imgJSON = {};
            imgJSON.img = 'uploads/'+file.split('/')[2];
            imgJSON.cols = 2  ;
            return imgJSON;
        });

        console.log(resArr);
        res.status(200).send(resArr);
    });

});

router.post('/upload', upload.single('mypic'), function (req, res) {

        console.log(upload);
            res.status(204).end();
});

module.exports = router;
