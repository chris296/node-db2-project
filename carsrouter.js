const express = require('express');
const knex = require('knex');

const knexfile = require('./knexfile');

const db = knex(knexfile.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'failed to get cars'})
    })
});

router.get("/:id", (req, res) => {
    const {id} = req.params;

    db("cars")
    .where({id})
    .first()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => {
        res.status(500).json({ message: 'failed to get car'})
    })
})

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars')
    .insert(carData)
    .then(ids => {
        db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
            res.status(201).json(newCarEntry);
        })
    })
    .catch(err => {
        console.log("POST error", err);
        res.status(500).json({ message: "failed to store data" })
    })
})

module.exports = router;