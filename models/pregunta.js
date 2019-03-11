let db = require('../db')

let getAll = (done) => {
    db.get().query('select * from preguntas', (err, rows) => {
        if(err) return console.log(err.message)
        done(null, rows)
    })
}

module.exports = {
    getAll: getAll
}