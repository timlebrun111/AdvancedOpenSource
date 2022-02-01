const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const router = require('./app_server/routes/index')
const hbs = require('handlebars')

app.use('/', router)

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

        formatPhoneNumber(phonenumber){
            if(phonenumber){
                let phone = phonenumber.toString()
                return "(" + phone.substring(0,3) + ") " + phone.substring(3,6) + "-" + phone.substring(6)
            }
        },
        makeBold(address){
            return new hbs.SafeString("<strong>" + address + "</strong>")
        },

        formatEmail(email){
            return new hbs.SafeString(`<a href="mailto:${email}">${email}</a>`);
        },
        uppercaseWord(word){
            if(word){
                return word.toUpperCase()

                
            }
        }

    }
}))

app.set('view engine', 'hbs')




//Set up port for connection
app.listen(3000, ()=>{
    console.log("Connected on port 3000")
})