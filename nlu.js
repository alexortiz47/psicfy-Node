const TelegrafWit = require('telegraf-wit')

const wit = new TelegrafWit('2ZT63FOZT5F2ORI64S5EXSUD7TMMFZ2T')

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        wit.meaning(message.text).then(result => { // Esto devuelve una promesa por tanto tenemos que trabajar con then
            message.nlu = result
            console.log(result.entities)
            resolve(message) // Con esto enviamos el message y podremos capturarlos con el then en donde llamemos a esta promesa
        }) 
    })
}