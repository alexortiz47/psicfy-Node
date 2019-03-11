let db = require('../db')

let getAll = (done) => {
    db.get().query('select * from especialidades', (err, rows) => {
        if (err) return console.log(err.message)
        done(null, rows)
    })
}

let create = (nombre, done) => {
    db.get().query('insert into especialidades values (null, ?)', [nombre], (err, result) => {
        if (err) return console.log(err.message)
        done(null, result)
    })
}

// Insertar especialidades de un psicologo en la BD
let createEsp = (objEsp) => {
    return new Promise((resolve, reject) => {
        db.get().query('insert into relpsicoesp values (null, ?, ?)', [objEsp.fk_psicologo, objEsp.fk_especialidades], (err, result) => {
            if (err) reject(err.message)
            resolve(result)
        })
    })
}

let deleteEsp = (fk_psicologo) => {
    return new Promise((resolve, reject) => {
        db.get().query('delete from relpsicoesp where fk_psicologo=?', [fk_psicologo], (err, result) => {
            if (err) reject(err.message)
            resolve(result)
        })
    })
}

// Obtener las especialidades de un psicologo concreto
let getEspByPsicologo = (id, done) => {
    db.get().query('select especialidades.nombre, especialidades.id from `relpsicoesp` inner join psicologos on `relpsicoesp`.`fk_psicologo`=`psicologos`.id inner join `especialidades` on `relpsicoesp`.`fk_especialidades`=`especialidades`.id where psicologos.id=?', [id], (err, result) => { // Saca solo los psicólogos de esp Ansiedad
        if (err) return console.log(err.message)
        done(null, result)
    })
}

module.exports = {
    getAll: getAll,
    getEspByPsicologo: getEspByPsicologo,
    create: create,
    createEsp: createEsp,
    deleteEsp: deleteEsp
}