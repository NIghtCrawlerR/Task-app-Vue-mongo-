const express = require('express'),
    mongodb = require('mongodb'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Card = require('../../card.model')


// module.exports = router;

var dbUrl = 'mongodb://NightCrawler:F9V6U0XxMmOZEVeA@ds141284.mlab.com:41284/task-app'

mongoose.connect(dbUrl, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
    console.log('MongoDB successfully connected')
})


router.route('/').get((req, res) => {
    Card.find({}, {'title': 1, 'descr': 1}, (err, cards) => {
        if (err) console.log
        else res.json(cards)
    })
})

router.route('/:id').get((req, res) => {
    const id = req.params.id
    Card.findById(id, (err, card) => {
        res.json(card)
    })
})

router.route('/add').post((req, res) => {
    let card = new Card(req.body)
    card.save()
        .then(response => res.status(200).json({'status': 'success', 'text': 'New card successfully added'}))
        .catch(err => res.status(400).json({'status' : 'error', 'text': 'Adding new card failed'}))
})

router.route('/update/:id').post((req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if(!card) res.status(404).json({'status': 'error', 'text': 'Data not found'})
        else {
            card.title = req.body.title
            card.descr = req.body.descr
            card.taskGroups = req.body.taskGroups

            card.save()
                .then(card => res.json({'status': 'success', 'text': 'Card updated successfully'}))
                .catch(err => res.status(400).json({'status': 'error', 'text': 'Update failed'}))
        }
    })
})

router.route('/delete/:id').delete((req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if(!card) res.status(404).json({'status': 'error', 'text': 'Data not found'})
        else {
            card.remove()
                .then(card => res.json({'status': 'succes', 'text': 'Card deletet successfully'}))
                .catch(err => res.json({'status': 'error', 'text': 'Delete failed'}))
        }
    })
})
// router.get('/', async (req, res) => {
//     const cards = await loadCardsCollection();
//     res.send(await cards.find({}).toArray());
// });
// router.get('/:id', async (req, res) => {
//     const cards = await loadCardsCollection();
//     res.send(await cards.findOne({ _id: new mongodb.ObjectID(req.params.id) }))
// })

// Add Post
// router.post('/add', async (req, res) => {
//     const cards = await loadCardsCollection();
//     console.log(req.body)
//     await cards.insertOne(req.body)
//         .then(m => res.status(200).json({ 'status': 'success', 'text': 'New task added successfully' }))
//         .catch(err => res.status(400).send('Adding new task failed'))
//     //res.status(201).send();
// });

// // Delete Post
// router.delete('/:id', async (req, res) => {
//     const cards = await loadCardsCollection();
//     await cards.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//     res.status(200).send();
// });

// async function loadCardsCollection() {
//     const client = await mongodb.MongoClient.connect(dbUrl, { useNewUrlParser: true });
//     return client.db('task-app').collection('cards');
// }

module.exports = router;