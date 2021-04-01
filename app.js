const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

// localhost:3000
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

const toDos = ['Go to university', 'Go to gym!']

app.get('/toDos', (req, res) => {
    res.render('toDos', { toDos: toDos })
})

app.get('/review', (req, res) => {
    res.render('review')
})

app.get('/todos/detail', (req, res) => { 
    res.render('detail')
})

app.listen(3000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 3000 ...')
})