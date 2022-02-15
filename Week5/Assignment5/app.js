const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const e = require('express')
const { Router } = require('express')
const {ObjectId} = require('mongodb')
const moment = require('moment')

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const exphbs = require('express-handlebars')



//Set the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
        getShortComment(comment){
            if(comment.length < 60){
                return comment
            }
            return comment.substring(0,60)+'...'
        },
        dateFormat(startDate){
                        
            

            return moment(startDate).format('YYYY-MM-DD').toString(); //04-05-2017
        }
        
   }
    
}))

app.set('view engine', 'hbs')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Empl',{
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})


require('./models/EmployeeData')

var EmployeeData = mongoose.model('employeedata')

//Saves the data
app.post('/saveEmployeeEntry', (req,res)=>{
    console.log(req.body)

    //create new Entry for Employee
    new EmployeeData(req.body).save().then(()=>{
        console.log("Data Saved")
        res.render('view')
    })
})

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/view', (req, res) => {
    res.render('view');
});

//Reads the data
app.get('/getData',(req,res)=>{
    EmployeeData.find().then((employeedata)=>{
        res.json({employeedata})
    })
})

//Deletes the Data

app.post('/deleteRecord',(req,res)=>{
    console.log("Record Deleted" + req.body._id + " " + req.body.employeedata)
    EmployeeData.findByIdAndDelete(req.body._id).exec()
    res.redirect("/getData")
})

//Updates the Data

app.get('/update/:id', (req,res,next)=>{
    console.log(req.params.id)
    EmployeeData.findById({_id: ObjectId(req.params.id)}, req.body, {new:true}, (err, docs)=>{
        if(err){
            console.log("Can't retrieve the data")
            next(err)
        }else{
            res.render('update', docs)
        }
    })
})

app.post('/update/:id', (req, res, next)=> {
    EmployeeData.findByIdAndUpdate({_id: ObjectId(req.params.id)}, req.body, (err,docs)=>{
        if(err){
            console.log("Something went wrong.")
        }else{
            res.redirect('../view')
        }
    })
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())
//enable Cross-Origin Resource Sharing
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')

  next()
})




app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

