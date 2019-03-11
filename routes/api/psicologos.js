var express = require('express');
var router = express.Router();

const psicologoModel = require('../../models/psicologo')

// // http://localhost:3000/api/psicologos
// router.get('/', (req, res) => {
//     psicologoModel.getAll((err, rows) => {
//         res.json(rows)
//     })
// })

// http://localhost:3000/api/psicologos Psicologos con las especialidades
router.get('/', (req, res) => {
    psicologoModel.getPsicEsp((err, rows) => {
        res.json(rows)
    })
})

module.exports = router;
