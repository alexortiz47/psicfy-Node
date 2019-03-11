var express = require('express');
var router = express.Router();

const psicologosRouter = require('./api/psicologos')
const preguntasRouter = require('./api/preguntas')
const especialidadesRouter = require('./api/especialidades')

router.use('/psicologos', psicologosRouter)
router.use('/preguntas', preguntasRouter)
router.use('/especialidades', especialidadesRouter)


module.exports = router;