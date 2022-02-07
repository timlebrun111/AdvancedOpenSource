const routes = require('./routes/routes')
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')



const hbs = require('express-handlebars').create({

    helpers: {  

        selectHelper: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value=\"' + selected + '\"'),
                '$& selected="selected"');
            
        },

        grid: (l,w) => {           
            const tStart = "<table class='tableStyle'><tbody>";
            const tClose = "</tbody></table>";
            let body = '';

            for(let i = 0; i < w; i++){
                body += '<tr>';
                for(let x = 0; x < l; x++){
                    
                    let backgroundColor = ((1<<24) * Math.random() | 0).toString(16);
        
                    body += `<td style="background-color: #${backgroundColor};"><font color ="black">#${backgroundColor}</font> <font color ="white">#${backgroundColor}</font></td>`
                }
                body += '</tr>';
            }
            return tStart + body + tClose;
        },
        error404: () => {
            const vars = ['shrink', 'rotate', 'still']
            let msg = "";
            for (let i = 0; i < 20 + Math.random() * 30; i++) {
                msg += `<div class="${vars[Math.floor(Math.random() * vars.length)]}">404</div>`
            }
            return new handlebars.SafeString(msg);
        }
    }
    
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', (hbs.engine));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/', routes);

app.listen(3000, ()=>{
    console.log("Connected on port 3000")
})


