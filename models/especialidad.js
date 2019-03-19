let db = require('../db')

let getAll = (done) => {
    db.get().query('SELECT * FROM especialidades', (err, rows) => {
        if (err) return console.log(err.message)
        done(null, rows)
    })
}

let create = (nombre, done) => {
    db.get().query('INSERT INTO especialidades VALUES (null, ?)', [nombre], (err, result) => {
        if (err) return console.log(err.message)
        done(null, result)
    })
}

// Insertar especialidades de un psicologo en la BD
let createEsp = (objEsp) => {
    return new Promise((resolve, reject) => {
        db.get().query('INSERT INTO relpsicoesp VALUES (null, ?, ?)', [objEsp.fk_psicologo, objEsp.fk_especialidades], (err, result) => {
            if (err) reject(err.message)
            resolve(result)
        })
    })
}

let deleteEsp = (fk_psicologo) => {
    return new Promise((resolve, reject) => {
        db.get().query('DELETE FROM relpsicoesp WHERE fk_psicologo=?', [fk_psicologo], (err, result) => {
            if (err) reject(err.message)
            resolve(result)
        })
    })
}

// Obtener las especialidades de un psicologo concreto
let getEspByPsicologo = (id, done) => {
    db.get().query('SELECT especialidades.nombre, especialidades.id FROM `relpsicoesp` INNER JOIN psicologos ON `relpsicoesp`.`fk_psicologo`=`psicologos`.id INNER JOIN `especialidades` ON `relpsicoesp`.`fk_especialidades`=`especialidades`.id WHERE psicologos.id=?', [id], (err, result) => { 
        if (err) return console.log(err.message)
        done(null, result)
    })
}

let getPsicologoByEsp = (idEsp) => {
    return new Promise((resolve, reject) => {
        db.get().query('SELECT psicologos.nombre, psicologos.apellidos, psicologos.id FROM `relpsicoesp` INNER JOIN psicologos ON `relpsicoesp`.`fk_psicologo`=`psicologos`.id INNER JOIN `especialidades` ON `relpsicoesp`.`fk_especialidades`=`especialidades`.id WHERE especialidades.id=?', [idEsp], (err, result) => { 
            if (err) reject(err.message)
            resolve(result)
        })
    })
    
}

module.exports = {
    getAll: getAll,
    getEspByPsicologo: getEspByPsicologo,
    getPsicologoByEsp: getPsicologoByEsp,
    create: create,
    createEsp: createEsp,
    deleteEsp: deleteEsp
}