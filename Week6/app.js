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

const exphbs = require('express-handlebars')



//Set the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{

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


require('./models/Contact.Model')

var ContactData = mongoose.model('contact')

//Saves the data
app.post('/saveContactEntry', (req,res)=>{
    console.log(req.body)

    //create new Entry for Contact
    new ContactData(req.body).save().then(()=>{
        console.log("Data Saved")
        res.render('view')
    })
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Assignment #6 created by Timothy LeBrun' });
});

app.get('/view', (req, res) => {
    res.render('view');
});

//Reads the data
app.get('/getData',(req,res)=>{
    ContactData.find().then((contact)=>{
        res.json({contact})
    })
})

app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

