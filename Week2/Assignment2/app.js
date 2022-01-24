var express = require('express')
var app = express()
var path = require('path')
var port = 3000

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/views/index.html"))
})

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+"/views/todo.json"))
})



app.use(express.static(__dirname+"/views"))

app.listen(port, function(){
    console.log("Connected at port: " + port)
})


app.use('/', function(req,res){
    res.redirect(301, 'http://localhost:3000/')
})