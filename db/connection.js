import { MongoClient } from 'mongodb'
const url = "mongodb://127.0.0.1:27017/notesDb"

let _db

export const initDb = cb => {
    MongoClient.connect(url)
        .then(client => {
            _db = client
            cb(null, _db)
        })
        .catch(err => {
            cb(err)
        })
}

export const getDb = () =>{
    return _db
}

