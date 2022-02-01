const mainPage = (req, res) =>{
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
}

const pageTwo = (req, res)=>{
    res.render('index', {
        title:"Page Two",
        name:"Bart Simpson",
        phonenumber:"4014677744",
        address:"1 New England Tech Blvd",
        email:"bsimpson@neit.edu",
        occupation:"Esteemed Professor of Skateboarding"
    })
}

const pageThree = (req, res)=>{
    res.render('index', {title:"Page Three"})
}

module.exports = {
    mainPage,
    pageTwo,
    pageThree
}