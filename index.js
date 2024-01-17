import express from 'express'
import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import notesRoutes from './routes/notes.js'
import { initDb, getDb } from './db/connection.js'


const app = express()
const port = 8000

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', function(req, res) {

    (async() => {
  
      const notes = await getDb().db().collection('notes').find({}).toArray() 
  
      // console.log(notes) 
  
      res.render('home', {notes})
  
    })()
      .catch(err => console.log(err))
    
});

app.use('/notes', notesRoutes)


initDb((err, db) => {
    if(err){
        console.log(err)
    }else{
        console.log('O banco conectou com sucesso!')
        app.listen(port, () => {
            console.log(`Projeto rodando na porta ${port}`)
        })
    }
})