const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const Story = require('../models/Story.js')
const { ensureAuth, ensureGuest } = require('../middleware/auth.js')

//@desc Login/Landing page
//@route GET /

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

//@desc LDashboard
//@route GET /

router.get('/dashboard', ensureAuth, async (req, res) => {
    const user = await User.findById(req.user.id)
    const name = user.firstName
    try {
        const stories = await Story.find({ user }).lean()

        res.render('dashboard', {
            name,
            stories
        })
        
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})
 
module.exports = router