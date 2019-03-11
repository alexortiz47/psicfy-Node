let db = require('../db')
const bcrypt = require('bcrypt')

// Obtener todos los psicologos
let getAll = (done) => {
    db.get().query('select * from psicologos', (err, rows) => {
        if(err) return console.log(err.message)
        done(null, rows)
    })
}

// Obtener todos los datos del psicologo con token determinado, para sacar en el formulario de editar datos del psicologo, los datos que tiene dicho psicólogo. Tb en la url (inicio/numColeg)
let getByToken = (token, done) => {
    db.get().query('select * from psicologos where token=?', [token], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

// Insertar psicologo en la BD
let create = ({nombre, apellidos, numColeg, domicilio, codPostal, poblacion, imgUrl, correo, password, latitud, longitud}) => {
    return new Promise((resolve, reject) => {
        let passwordEncriptada = bcrypt.hashSync(password, 10)
        db.get().query('insert into psicologos (nombre, apellidos, numColeg, domicilio, codPostal, poblacion, imgUrl, correo, password, latitud, longitud) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, numColeg, domicilio, codPostal, poblacion, imgUrl, correo, passwordEncriptada, latitud, longitud], (err, result) => {
            if(err) resolve(err.message)
            reject(result)
        })
    })
}

let createAdmin = (values) => {
    return new Promise((resolve, reject) => {
        let passwordEncriptada = bcrypt.hashSync(values.password, 10)
        db.get().query('insert into administrador values(null, ?, ?)', [values.correo, passwordEncriptada], (err, result) => {
            if(err) resolve(err.message)
            reject(result)
        })
    })
}

// Obtener todos los datos de un psicologo con correo determinado para login
let getByCorreo = (correo, done) => {
    db.get().query('select * from psicologos where correo=?', [correo], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

// Obtener todos los datos de un administrador con correo determinado para login
let getByCorreoAdmin = (correo, done) => {
    db.get().query('select * from administrador where correo=?', [correo], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

// Actualizar el token en la BD, el cual es null hasta que hace login y se actualiza
let updateToken = ({id, token}, done) => {
    db.get().query('update psicologos set token=? where id=?', [token, id], (err, result) => {
        if(err) return console.log(err.message)
        done(null, result)
    })
}

// Actualizar datos del psicologo en la BD
let updatePsicologo = (valuesUpdate) => {
    console.log(valuesUpdate)
    return new Promise((resolve, reject) =>{
        let q = 'update psicologos set  '
        let arr = []
        if(valuesUpdate.domicilio){
            q+= 'domicilio = ?, '
            arr.push(valuesUpdate.domicilio)
        }
        if(valuesUpdate.codPostal){
            q+= 'codPostal = ?, '
            arr.push(valuesUpdate.codPostal)
        }
        if(valuesUpdate.poblacion){
            q+= 'poblacion = ?, '
            arr.push(valuesUpdate.poblacion)
        }
        if(valuesUpdate.imgUrl){
            q+= 'imgUrl = ?, '
            arr.push(valuesUpdate.imgUrl)
        }
        if(valuesUpdate.correo){
            q+= 'correo = ?, '
            arr.push(valuesUpdate.correo)
        }
        q = q.substring(0, q.length-2)
        q+= ' where token = ?'
        if(arr.length === 0){
            return resolve()
        }else{
            arr.push(valuesUpdate.token)
        }
        // console.log(arr)
        // console.log(q)
        db.get().query(q, arr, (err, result) => {
            if(err) console.log(err.message)
            resolve (result)
        })
    })
}

let deletePsicologo = (token) =>{
    return new Promise((resolve, reject) => {
        db.get().query('delete from psicologos where token=?', [token], (err, result) => {
            if(err) reject(err.message)
            resolve(result)
        })
    })
}

module.exports = {
    getAll: getAll,
    create: create,
    createAdmin: createAdmin,
    getByToken: getByToken,
    updatePsicologo: updatePsicologo,
    deletePsicologo: deletePsicologo,
    getByCorreo: getByCorreo,
    getByCorreoAdmin: getByCorreoAdmin,
    updateToken: updateToken
}