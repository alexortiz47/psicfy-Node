var express = require('express');
var router = express.Router();

const preguntaModel = require('../../models/pregunta')

// http://localhost:3000/api/preguntas
router.get('/', (req, res) => {
    preguntaModel.getAll((err, rows) => {
        res.json(rows)
    })
})

module.exports = router;