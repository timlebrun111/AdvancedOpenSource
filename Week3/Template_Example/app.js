const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

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
        }
    }
}))

app.set('view engine', 'hbs')

//route to render the page
app.get('/', (req, res)=>{
    res.render('home', {
        post:[
            {
                author:"Timothy L",
                image:"https://picsum.photos/500/500",
                comments:['comment 1', 'comment 2', 'Non consequat nisi aliquip occaecat. Occaecat nulla in mollit cillum non. Occaecat ullamco nulla cillum veniam officia laborum deserunt labore pariatur nisi occaecat. Dolore Lorem reprehenderit ad culpa cillum in.']
            },
            {
                author:"Jordan D",
                image:"https://picsum.photos/500/500?2",
                comments:[]
            },
            {
                author:"Terry B",
                image:"https://picsum.photos/500/500?3",
                comments:['yo this is awesome', 'Proident aliquip irure elit ipsum sit officia qui dolore exercitation. Exercitation ut ullamco voluptate duis et labore proident. Ad duis est laborum proident eu aliqua. Anim voluptate in nisi pariatur non veniam non sit officia ad proident irure. Tempor magna qui aliqua fugiat veniam. Nulla magna fugiat elit laborum elit ex occaecat nisi.', 'this is the best']
            }
        ]
    })
})

//Set up port for connection
app.listen(3000, ()=>{
    console.log("Connected on port 3000")
})