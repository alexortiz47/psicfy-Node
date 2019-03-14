// Nos hemos traído la funcion del metodo .then() que recoje el resolve de la promesa del nlu. Y en el apiTelegram lo requerimos


module.exports = (message) => {
    return new Promise((resolve, reject) => {
        if(message.nlu.entities && message.nlu.entities.intent && message.nlu.entities.intent.length > 0) {
            let intentWit = message.nlu.entities.intent[0].value
            console.log(intentWit)
            resolve(evaluarMensaje(intentWit))
        }else {
            resolve('Lo siento, no se que quieres decir')
        }
    })
}

function evaluarMensaje(pIntentWit) {
    let answer = ''
    switch(pIntentWit) {
        case 'saludo':
            answer = 'Hola, ¿En que puedo ayudarte?'
        break;
        case 'despedida':
            answer = 'Muchas gracias por usar el servicio. ¡Hasta pronto!'
        break
        case 'funcionamiento':
            answer = 'Se trata de una plataforma para acercar la psicología a las personas. Te podemos orientar a la hora de decidir a que tipo de psicólogo asistir, así como facilitarte los datos de contacto del que más se ajuste a tus necesidades.'
    }

    return answer
}