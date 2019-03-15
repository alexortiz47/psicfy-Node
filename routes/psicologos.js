var express = require('express');
var router = express.Router();
const tokengn = require('tokengn')
const bcrypt = require('bcrypt')

const psicologoModel = require('../models/psicologo')
const especialidadModel = require('../models/especialidad')

// http://localhost:3000/psicologos
router.get('/', (req, res) => {
    psicologoModel.getAll((err, rows) => {
        console.log(rows)
        res.json(rows)
    })
})

// http://localhost:3000/psicologos/delete
router.post('/delete', async (req, res) => {
    // console.log(req.body)
    try{
        let result = await psicologoModel.deletePsicologo(req.body.token)
    }catch(err){
        console.log(err.message)
    }
    let respuesta = {
        mensaje: '¡Usuario Eliminado!'
    }
    res.json(respuesta)
})

// http://localhost:3000/psicologos/create
router.post('/create', async (req, res) => {
    try{
        let result = await psicologoModel.create(req.body)
        console.log(result)
        for(let i = 0; i < req.body.especialidades.length; i++) {
            let objEsp = {
                fk_psicologo: result.insertId,
                fk_especialidades: req.body.especialidades[i]
            }
            await especialidadModel.createEsp(objEsp)
        }
    }catch(err){
        console.log(err.message)
    }
    let respuesta = {
        mensaje: '¡Usuario Registrado!'
    }
    res.json(respuesta)
})

// http://localhost:3000/psicologos/checklogin
router.post('/checklogin', (req, res) => {
    psicologoModel.getByCorreo(req.body.correo, (err, rows) => {
        if(err) return console.log(err.message)
        if(rows.length == 0) {
            return res.json({error: 'Usuario y/o contraseña incorrecto'})
        }else if(rows.length == 1){
            let correcto = bcrypt.compareSync(req.body.password, rows[0].password)
            if(correcto){
                let token = tokengn({}) // Generamos nuevo token
                let tokenValues = { // Creamos obj para pasarselo a updateToken
                    id: rows[0].id,
                    token: token
                }
                psicologoModel.updateToken(tokenValues, (err, result) => {
                    if(err) return console.log(err.message)
                    psicologoModel.getByToken(tokenValues.token, (err, result) => {
                        return res.json(result[0])
                    })
                })                
            }else{
                return res.json({error: 'Usuario y/o contraseña incorrecto'})
            }
        }
    })
})

// http://localhost:3000/psicologos/token
router.post('/token', (req, res) => {
    // console.log(req.body)
    psicologoModel.getByToken(req.body.token, (err, result) => {
        if(err) return console.log(err.message)
        res.json(result[0])
    })
})

// http://localhost:3000/psicologos/update
router.post('/update', async (req, res) => {
    // console.log(req.body)
    try{ 
        let result = await psicologoModel.updatePsicologo(req.body)
        // console.log(result)
        if(req.body.especialidades){
            await especialidadModel.deleteEsp(req.body.id)
            for(let i = 0; i < req.body.especialidades.length; i++) {
                let objEsp = {
                    fk_psicologo: req.body.id,
                    fk_especialidades: req.body.especialidades[i]
                }
                await especialidadModel.createEsp(objEsp)
            }
        }
    }catch(err){
        console.log(err.message)
    }
    let respuesta = {
        mensaje: '¡Usuario Actualizado!'
    }
    res.json(respuesta)
})

// http://localhost:3000/psicologos/delete
router.post('/delete', async (req, res) => {
    // console.log(req.body)
    try{
        let result = await psicologoModel.deletePsicologo(req.body.token)
    }catch(err){
        console.log(err.message)
    }
    let respuesta = {
        mensaje: '¡Usuario Eliminado!'
    }
    res.json(respuesta)
})

// http://localhost:3000/psicologos/createAdmin
router.post('/createAdmin', async (req, res) => {
    try{
        await psicologoModel.createAdmin(req.body)
    }catch(err){
        console.log(err.message)
    }
    let respuesta = {
        mensaje: '¡Admin Registrado!'
    }
    res.json(respuesta)
})

// http://localhost:3000/psicologos/checkloginAdmin
router.post('/checkloginAdmin', (req, res) => {
    // console.log(req.body)
    psicologoModel.getByCorreoAdmin(req.body.correo, (err, rows) => {
        // console.log(rows)
        if(err) return console.log(err.message)
        if(rows.length == 0) {
            return res.json({error: 'Usuario y/o contraseña incorrecto'})
        }else if(rows.length == 1){
            let correcto = bcrypt.compareSync(req.body.password, rows[0].password)
            if(correcto){
                return res.json(rows[0])
            }else{
                return res.json({error: 'Usuario y/o contraseña incorrecto'})
            }
        }
    })
})

module.exports = router;
