const express = require("express");
const app = express(); 

app.get("/",(req , res ) => {
    res.send("hello parth");
});
app.get("/about",(req , res ) => {
    res.send("hello this is about page");
});
 app.listen(8000, () => {
     console.log("listing the port at 8000")
 })