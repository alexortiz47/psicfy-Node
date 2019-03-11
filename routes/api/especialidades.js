var express = require('express');
var router = express.Router();

const especialidadModel = require('../../models/especialidad')

// http://localhost:3000/api/especialidades
router.get('/', (req, res) => {
    especialidadModel.getAll((err, rows) => {
        res.json(rows)
    })
})

module.exports = router;