const express = require('express');
const routes = require('./routes/routes');
const api = require('./routes/api/employees');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const hbs = require('express-handlebars').create({
    helpers: {       
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
        }     
    }
});


const app = express();


app.engine('handlebars', (hbs.engine));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', api);
app.use('/', routes);


mongoose.connect('mongodb://localhost:27017/Empl',{
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

