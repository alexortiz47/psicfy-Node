var express = require('express');
var router = express.Router();

const preguntaModel = require('../models/pregunta')

// http://localhost:3000/preguntas
router.get('/', (req, res) => {
    preguntaModel.getAll((err, rows) => {
        if(err) return console.log(err.message)
        res.json(rows)
    })
})

module.exports = router;
