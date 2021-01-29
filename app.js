var request  = require("express");
var express = require("express");
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express(); 


app.use(cors())


var jsonParser = bodyParser.json()


//Mysql Database Connection parameters
var mysql = require('mysql');

var connection  = mysql.createConnection({
  host: "localhost",
  port:3306,
  user: "root",
  password: "admin",
  database: 'emsdb'
});

connection.connect(function(error) {
    if (error) throw error;
    console.log(" Database Connected!");
  });

  app.get('/' , function(req , resp){
req= req['fname'];
    connection.query("SELECT * FROM e_tbl WHERE fname='parth'" , function (error , rows){
      if(!!error){
      console.log('error in the query');
      } else {
      resp.send(rows);
      console.log('user find');
    
    }
      });
    });

    
app.post('/api/employee/checkIn',jsonParser,function(req,res){
  var jsondata = req.body;
  var values = [];

  values.push(
      jsondata.c_ts,
      jsondata.c_date,
      jsondata.e_id
  );

  let date_ob = new Date();

  let date_today = ("0" + date_ob.getDate()).slice(-2);

  var checkInLock = false;

  connection.query("select c_ts from c_tbl where e_id = "+jsondata.e_id , function(err, result) {
    if(err){
      console.log(err);
      res.send(error);
    } else {
      var e_data = [];
      e_data = result; // for loop e_data
      if (e_data.length > 0) {
        for (var i=0; i < e_data.length; ++i) {
          var check_in = e_data[i].c_ts.toString();
          if(check_in.includes(date_today.toString())) {
            console.log("\n check_in result "+check_in);
            checkInLock = true;
            res.status(404).json({
              "result":"You've already checked in"
            });
          }
        }
      }
    }
  });
  if(!checkInLock) {
    console.log("INSERTING CHECK IN TIME...")
    connection.query("INSERT INTo c_tbl (c_ts, c_date, e_id) values (?)",[values], function(error, result){
      res.status(200).json({
        "result":"Successfully checked in @ "+ jsondata.c_ts.toString()
      });
    });
  }

});

app.listen(5000);