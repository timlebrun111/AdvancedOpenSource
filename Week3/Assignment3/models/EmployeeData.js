const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    firstName:{
        type:String,
        required:true
    }
})

mongoose.model('employeedata', EmployeeSchema)