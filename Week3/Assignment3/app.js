const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')

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
        res.redirect('view.html')
    })
})

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
    res.redirect("view.html")
})




app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

