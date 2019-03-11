var express = require('express');
var router = express.Router();

const especialidadModel = require('../models/especialidad')

// http://localhost:3000/especialidades
router.get('/', (req, res) => {
    especialidadModel.getAll((err, rows) => {
        if(err) return console.log(err.message)
        // console.log(rows)
        res.json(rows)
    })
})

// http://localhost:3000/especialidades/psicol
router.post('/psicol', (req, res) => {
    // console.log(req.body.id)
    especialidadModel.getEspByPsicologo(req.body.id, (err, result) => {
        if(err) return console.log(err.message)
        res.json(result)
    })
})

// http://localhost:3000/especialidades/create
router.post('/create', (req, res) => {
    console.log(req.body)
    especialidadModel.create(req.body.nombre, (err, result) => {
        if(err) return console.log(err.message)
        res.json('¡Especialidad Añadida!')
    })

})

module.exports = router;