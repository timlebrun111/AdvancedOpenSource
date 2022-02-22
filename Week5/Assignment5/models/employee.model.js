const mongoose = require('mongoose')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },

    
})


let Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee
