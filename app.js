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
                deleted: false,
            })

            fs.writeFile('./data/toDos.json', JSON.stringify(toDos), err => {
                if (err) throw err

                res.render('create', { success: true })
            })
        })
    }
})


app.get('/toDos', (req, res) => {

    fs.readFile('./data/toDos.json', (err, data) => {
        if (err) throw err

        const toDos = JSON.parse(data).filter(toDo => toDo.deleted == false)

        res.render('toDos', { toDos: toDos })
    })

})

app.get('/deleted', (req, res) => {
    fs.readFile('./data/toDos.json', (err, data) => {
        if (err) throw err

        const toDos = JSON.parse(data).filter(toDo => toDo.deleted == true)

        res.render('toDos', { toDos: toDos })
    })
})

app.get('/toDos/:id/delete', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/toDos.json', (err, data) => {
        if (err) res.sendStatus(500)
    
        const toDos = JSON.parse(data)
        const toDO = toDos.filter(toDo => toDo.id == req.params.id)[0]
        const toDoIdx = toDos.indexOf(toDO)
        const splicedToDo = toDos.splice(toDoIdx, 1)[0]
        splicedToDo.deleted = true
        toDos.push(splicedToDo)
    
        fs.writeFile('./data/toDos.json', JSON.stringify(toDos), err => {
          if (err) res.sendStatus(500)
    
          res.redirect('/toDos')
        })
        
      })
})



app.get('/api/v1/toDos', (req, res) => {
    fs.readFile('./data/toDos.json', (err, data) => {
        if (err) throw err

        const toDos = JSON.parse(data)
        
        res.json(toDos)
    })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/toDos.json', (err, data) => {
        if (err) throw err

        const toDos = JSON.parse(data)
         
        const toDo = toDos.filter(toDo => toDo.id == id)[0]

        res.render('detail', { toDo : toDo })

    })
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