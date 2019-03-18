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
        break
        case 'buscar':
            answer = 'Para buscar un psicólogo, accede al apartado Buscar profesional, y ahí podrás hacer una búsqueda según tu localización o bien acceder a todos los psicólogos registrados y filtrar según lo que necesites'
        break
        case 'evaluar':
            answer = 'Para que podamos evaluar tu situación y orientarte sobre el profesional más adecuado, accede al apartado Evaluate y sigue los pasos'
        break
    }

    return answer
}