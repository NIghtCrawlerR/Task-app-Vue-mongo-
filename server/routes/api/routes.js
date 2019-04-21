const express = require('express'),
    mongodb = require('mongodb'),
    router = express.Router()


// module.exports = router;

var dbUrl = 'mongodb://NightCrawler:F9V6U0XxMmOZEVeA@ds141284.mlab.com:41284/task-app'

// Get Cards
router.get('/', async (req, res) => {
    const cards = await loadCardsCollection();
    res.send(await cards.find({}).toArray());
});
router.get('/:id', async(req, res) => {
    const cards = await loadCardsCollection();
    res.send(await cards.findOne({ _id: new mongodb.ObjectID(req.params.id) }))
})

// Add Post
router.post('/', async (req, res) => {
    const cards = await loadCardsCollection();
    await cards.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const cards = await loadCardsCollection();
    await cards.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadCardsCollection() {
    const client = await mongodb.MongoClient.connect(dbUrl, { useNewUrlParser: true });

    return client.db('task-app').collection('cards');
}

module.exports = router;