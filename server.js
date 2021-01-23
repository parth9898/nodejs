const express = require("express");
const app = express(); 
var sqlDb = require("mssql"); 




var dbConfig ={
    server :"localhostPARTH-PC\SQLEXPRESS",
    database:"E_db",
    user:"Parth",
    password:" ",
    port: 1433
    };
    
    function getEmp() {
    var conn = new sqlDb.ConnectionPool(dbConfig);
    var req = new sqlDb.Request(conn);
    
    conn.connect(function (err) {
    if (err){
    console.log(err);
    }
    req.query("SELECT * FROM  etbl" , function (err , recordset) {
    if (err) {
     console.log(err);
    }
    else {
    console.log(recordset);
    }
    conn.close();
    });
    });
    }
    
    app.listen(8000, () => {
        console.log("listing the port at 8000")
        
    })

        getEmp();