const TelegrafWit = require('telegraf-wit')

const wit = new TelegrafWit('5IUB2DHVUZRPRFMDLOO4B2MZF5ONRN7O')

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        wit.meaning(message.text).then(result => { // Esto devuelve una promesa por tanto tenemos que trabajar con then
             message.nlu = result
             resolve(message) // Con esto enviamos el message y podremos capturarlos con el then en donde llamemos a esta promesa
        }) 
    })
}