const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

// localhost:3000
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if (title.trim() === '' && description.trim() === '') {
        res.render('create', { error: true, msg: 'To-Do app title or description cannot be empty!' })
    } else {
        fs.readFile('./data/toDos.json', (err, data) => {
            if (err) throw err

            const toDos = JSON.parse(data)

            toDos.push({
                id: id(),
                title: title,
                description: description,
            })

            fs.writeFile('./data/toDos.json', JSON.stringify(toDos), err => {
                if (err) throw err

                res.render('create', { success: true })
            })
        })
    }
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

function id() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};