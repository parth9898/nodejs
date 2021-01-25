var request  = require("express");
var express = require("express");
var app = express(); 

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

    connection.query("SELECT * FROM e_tbl" , function (error , rows){
      if(!!error){
      console.log('error in the query');
      } else {
      resp.send(rows);
    
    }
      });
    })
app.listen(8000);
 
