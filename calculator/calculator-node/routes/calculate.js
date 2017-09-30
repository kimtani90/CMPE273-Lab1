var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.post('/', function (req, res) {

    var input = req.body.input;

    console.log("Input:"+input);

    var inputArr=input.split(" ");

    var result=0;

    for(var i=0;i< inputArr.length;i++){

      if(inputArr[i]==='+'){

          result=Number(inputArr[i-1])+Number(inputArr[i+1]);
      }
    }


    if(result !== 0){

        res.status(201);
        res.send(JSON.stringify({"result":result}));
        res.body(JSON.stringify({"result":result}));


    } else {
        res.status(401);

    }

});



module.exports = router;
