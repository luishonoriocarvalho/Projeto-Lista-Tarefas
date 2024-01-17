import { Router } from 'express'
import { getDb } from '../db/connection.js'
import {ObjectId} from 'mongodb'


const router = Router()


router.get('/', (req, res) => {
    res.render('notes/create')
})

router.post('/', (req, res) => {
    const data = req.body;
    const title = data.title;
    const description = data.description;

    getDb()
        .db()
        .collection('notes')
        .insertOne({ title: title, description: description })
        .then(() => {
            res.status(301).location('/');
            res.end();
        })
        .catch((err) => {
            console.error('Erro ao inserir nota:', err);
            res.status(500).send('Erro interno do servidor');
        })
})

router.post('/delete', function(req, res) {

    const data = req.body;
    const id = new ObjectId(data.id);
  
    getDb()
      .db()
      .collection('notes')
      .deleteOne({_id: id})
  
    res.redirect('/', 301, { msg: "Nota removida!"});
  
})

router.get('/:id', function(req, res) {

    (async() => {
  
      const id = new ObjectId(req.params.id);
  
      const note = (await getDb().db().collection('notes').find({ _id: id}).toArray())[0]
      
  
      res.render('notes/detail', {note});
  
    })()
      .catch(err => console.log(err))
    
})

router.get('/edit/:id', function(req, res) {

    (async() => {
  
      const id = new ObjectId(req.params.id);
  
      const note = (await getDb().db().collection('notes').find({ _id: id}).toArray())[0]
      
      // console.log(note) 
  
      res.render('notes/edit', {note});
  
    })()
      .catch(err => console.log(err))
    
})

router.post('/update', function(req, res) {

    const data = req.body;
    const id = new ObjectId(data.id);
    const title = data.title;
    const description = data.description;
  
    getDb()
      .db()
      .collection('notes')
      .updateOne({_id: id}, { $set: { title: title, description: description } })
    
    res.redirect('/');
  
})
  
  

export default router 