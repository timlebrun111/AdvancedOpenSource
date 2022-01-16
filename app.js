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


/* Send the HTTP header
* HTTP Status: 301 : Moved Permanently
* Location:'http://' +  'The host of the requested location' + the path to the page that you want to be redirected to.
*/
app.use('/', function(req,res){
    res.redirect(301, 'http://localhost:3000/')
})






/*var http = require('http')
var url = require('url')
var fs =require('fs')

http.createServer(function(request,response){
    var pathName = request.url
    var fileName = "index.html"
    var jsonFileName = "todo.json"
    fs.readFile(fileName, callback)
    fs.readFile(jsonFileName, jsonCallBack)

   

    function callback(err,data){
        if(err){
            console.log(err)
            response.writeHead(400, {'Content-type':'text/html'})
            console.write('<!DOCTYPE><html><body><div> Page not found </div></body></html>')
        }
        else{
            response.writeHead(200,({'Content-type':'text/html'}));
            response.write(data.toString()) 
            
        }
        response.end();
    }

    function jsonCallBack(err,data){
        if(err){
            console.log(err)
            response.writeHead(400, {'Content-type':'application/json'})
            console.write('<!DOCTYPE><html><body><div> Page not found </div></body></html>')
        }
        else{
            response.writeHead(200,({'Content-type':'application/json'}));
            response.write(data.toString()) 
            
        }
        response.end();
    }
    
    
}).listen(3000)

console.log("Running on port 3000");
*/