const express = require('express'),
    mongodb = require('mongodb'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Card = require('../../card.model')
    Label = require('../../label.model')

var dbUrl = 'mongodb://NightCrawler:F9V6U0XxMmOZEVeA@ds141284.mlab.com:41284/task-app'

mongoose.connect(dbUrl, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
    console.log('MongoDB successfully connected')
})

router.route('/').get((req, res) => {
    Card.find({}, {'title': 1, 'descr': 1, 'order': 1}, (err, cards) => {
        if (err) console.log
        else res.json(cards)
    }).sort({'order': 1})
})

router.route('/:id').get((req, res) => {
    const id = req.params.id
    Card.findById(id, (err, card) => {
        res.json(card)
    })
})

router.route('/labels/get').get((req, res) => {
    console.log('get')
    Label.find({}, (err, label) => {
        console.log(label)
        res.json(label)
    })
})

router.route('/add').post((req, res) => {
    let card = new Card(req.body)
    
    card.save()
        .then(response => res.status(200).json({'status': 'success', 'text': 'New card successfully added'}))
        .catch(err => res.status(400).json({'status' : 'error', 'text': 'Adding new card failed'}))
})


router.route('/labels/add').post((req, res) => {
    let label = new Label(req.body)
    
    label.save()
        .then(response => res.status(200).json({'status': 'success', 'text': 'New label successfully added'}))
        .catch(err => res.status(400).json({'status' : 'error', 'text': 'Adding new label failed'}))
})

router.route('/update/:id').post((req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if(!card) res.status(404).json({'status': 'error', 'text': 'Data not found'})
        else {
            card.title = req.body.title
            card.descr = req.body.descr
            card.order = req.body.order
            card.taskGroups = req.body.taskGroups
            card.save()
                .then(card => {
                    console.log(card)
                    res.json({'status': 'success', 'text': 'Card updated successfully'})
                })
                .catch(err => res.status(400).json({'status': 'error', 'text': 'Update failed'}))
        }
    })
})

router.route('/updateOrder').post((req, res) => {
    req.body.ids.map((id, i) => {
        Card.findById(id, (err, card) => {
            if(!card) res.status(404).json({'status': 'error', 'text': 'Data not found'})
            card.set('order', i);
            card.save();
        })
    })
})

router.route('/delete/:id').delete((req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if(!card) res.status(404).json({'status': 'error', 'text': 'Data not found'})
        else {
            card.remove()
                .then(card => res.json({'status': 'success', 'text': 'Card deleted successfully'}))
                .catch(err => res.json({'status': 'error', 'text': 'Delete failed'}))
        }
    })
})

router.route('/labels/delete/:id').delete((req, res) => {
    Label.findById(req.params.id, (err, label) => {
        if(!label) res.status(404).json({'status': 'error', 'text': 'Data not found'})
        else {
            label.remove()
                .then(card => res.json({'status': 'success', 'text': 'label deleted successfully'}))
                .catch(err => res.json({'status': 'error', 'text': 'Delete failed'}))
        }
    })
})


module.exports = router;