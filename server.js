const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionStr =  process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to DB')
        db = client.db(dbName)
        collection = db.collection('movies')
    })
    .catch(err => console.log(err))

//Read URLs
app.use(express.urlencoded({extended: true}))
//Read JSON
app.use(express.json())
//Allow cross or
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/search', async (req, res) => {
    try {
        let results = await collection.agregate([
            {
                "$Search" : {
                    "autocomplete" : {
                        "query" : `${req.query.query}`,
                        "path" : "title",
                        "fuzzy" : {
                            "maxEdits" : 2,
                            "prefixLength" : 3

                        }
                    }
                }
            }
        ]).toArray()
    } catch (err) {
        response.status(500).send({message: err.message})
    }
})

app.get('/movie/:id', async (req, res) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(req.params.id)
        })
        res.send(result)
    } catch (err) {
        res.status(500).send({message: err.message})

    }
})



app.listen(process.env.PORT || PORT, () => {
    console.log('Server is Running')
}) 