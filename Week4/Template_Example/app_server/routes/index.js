const express = require('express')
const router = express.Router()
const ctrlPages = require('../controllers/pages')

//Routers go in this section.

router.get('/', ctrlPages.mainPage) 
router.get('/pageTwo', ctrlPages.pageTwo)
router.get('/pageThree', ctrlPages.pageThree)



module.exports = router