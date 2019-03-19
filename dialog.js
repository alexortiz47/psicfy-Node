// Nos hemos traído la funcion del metodo .then() que recoje el resolve de la promesa del nlu. Y en el apiTelegram lo requerimos

const especialidadModel = require('./models/especialidad')

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        if (message.nlu.entities && message.nlu.entities.intent && message.nlu.entities.intent.length > 0) {
            let intentWit = message.nlu.entities.intent[0].value
            console.log(intentWit)
            if (intentWit === 'search') {
                let espWit = message.nlu.entities.especialidad[0].value
                resolve(evaluarMensajeSearch(espWit))
            } else {
                resolve(evaluarMensaje(intentWit))
            }

        } else {
            resolve({ mensaje: 'Lo siento, no se que quieres decir' })
        }
    })
}

function evaluarMensaje(pIntentWit) {
    let answer = {
        tipo: pIntentWit,
        mensaje: ''
    }
    switch (answer.tipo) {
        case 'saludo':
            answer.mensaje = 'Hola, ¿En que puedo ayudarte?'
            break;
        case 'despedida':
            answer.mensaje = 'Muchas gracias por usar el servicio. ¡Hasta pronto!'
            break
        case 'funcionamiento':
            answer.mensaje = 'Se trata de una plataforma para acercar la psicología a las personas. Te podemos orientar a la hora de decidir a que tipo de psicólogo asistir accediendo a <a href="/evaluate">Evalúate</a>, así como facilitarte los datos de contacto del que más se ajuste a tus necesidades en <a href="/buscar_filtrado">Buscar profesional</a>.'
            break
        case 'buscar':
            answer.mensaje = 'Puedes buscar un psicólogo según tu <a href="/buscar_localizacion">localización</a>, o acceder a todos los <a href="/buscar_filtrado">psicólogos</a>.<br> Si lo prefieres, puedes indicarme la especialidad que buscas:'
            break
        case 'evaluar':
            answer.mensaje = 'Para que podamos evaluar tu situación y orientarte sobre el profesional más adecuado, accede <a href="/evaluate">aquí</a> y sigue los pasos.'
            break
        case 'registro':
            answer.mensaje = 'Registrarse como profesional te da a conocer a los usuarios que utilicen el servicio, y que así puedan contactar contigo.'
            break
        case 'contacto':
            answer.mensaje = 'Puedes contactarnos <a href="/contacto">aquí</a>'
            break
    }

    return answer
}

let evaluarMensajeSearch = async (pEspWit) => {
    let pEspWitFormat = pEspWit.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    let answer = {
        tipo: 'search',
        especialidad: pEspWitFormat,
        mensaje: `Aquí tienes algunos psicólogos para lo que buscas. Para más detalles, puedes hacer click en ellos:`,
        psicologos: []
    }
    let result = ''

    let especialidades = {
        'ansiedad': 6,
        'depresion': 7,
        'sueno': 8,
        'trastornos alimenticios': 9,
        'alimentacion': 9,
        'pareja': 10,
        'sexo': 10,
        'relaciones sexuales': 10,
        'sexualidad': 10,
        'familia': 11,
        'toxicos': 12,
        'consumo de toxicos': 12,
        'adicciones': 13,
        'duelo': 14,
        'estres postraumatico': 15,
        'tept': 15,
        'violencia de genero': 16,
        'discapacidad': 17,
        'trastorno mental grave': 18,
        'coaching': 19
    }

    result = await especialidadModel.getPsicologoByEsp(especialidades[pEspWitFormat])
    answer.psicologos = result

    return answer
}