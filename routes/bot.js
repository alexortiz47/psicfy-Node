var express = require('express');
var router = express.Router();

const nlu = require('../nlu')
const dialog = require('../dialog')

// https://localhost:3000/bot
router.post('/', (req, res) => {
    let msg = req.body.mensaje
    nlu({ text: msg })
        .then(dialog)
        .then((response) => {
            res.json({mensaje: response})
        })
})

module.exports = router;
