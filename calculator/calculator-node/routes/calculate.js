var express = require('express');
var router = express.Router();

var result=0;

router.get('/', function(req, res) {
    res.status(200).send(result);
});

router.post('/', function (req, res) {
    console.log('hello baby');
console.log(req.body);
    var input = req.body.input;

    console.log("Input:"+input);
    console.log("00000");
    var inputArr=input.split(" ");


    console.log("111111");
    for(var i=0;i< inputArr.length;i++){
        console.log("22222");
      if(inputArr[i]==='+'){
          console.log("33333");
          result=Number(inputArr[i-1])+Number(inputArr[i+1]);
      }
    }


    console.log("Resultffffff:"+result);
    if(result !== 0){

        console.log("Result:"+result);

        res.status(201);

        res.send({"result":result});
        /*
        res.send(JSON.stringify({"result":result}));
        res.body(JSON.stringify({"result":result}));
*/

    } else {
        res.status(401);

    }

});



module.exports = router;
