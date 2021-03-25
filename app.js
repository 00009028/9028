const express = require('express')
const app = express()

app.set('view engine', 'pug')

// localhost:3000
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 3000 ...')
})