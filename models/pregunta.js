let db = require('../db')

let getAll = (done) => {
    db.get().query('SELECT * FROM preguntas', (err, rows) => {
        if(err) return console.log(err.message)
        done(null, rows)
    })
}

module.exports = {
    getAll: getAll
}