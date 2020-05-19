require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)
const moment = require('moment')
const Games = require('../models/games.model')
const User = require('../models/user.model')
const Review = require('../models/review.model')
const Events = require('../models/events.model')

mongoose.connect(process.env.DB, { useUnifiedTopology: true, useNewUrlParser: true })

Games.collection.drop()
User.collection.drop()
Review.collection.drop()
Events.collection.drop()

const users = [
    {
        username: "Alejandro",
        password: bcrypt.hashSync('123', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Emanuel",
        password: bcrypt.hashSync('456', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Erica",
        password: bcrypt.hashSync('135', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Hilario",
        password: bcrypt.hashSync('246', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Solano",
        password: bcrypt.hashSync('357', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Blanca",
        password: bcrypt.hashSync('468', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Ornella",
        password: bcrypt.hashSync('579', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    },
    {
        username: "Claus",
        password: bcrypt.hashSync('680', salt),
        userImage: "https://www.vexels.com/media/users//3/145908/raw/52eabf633ca6414e60a7677b0b917d92.jpg",
        favorites: []
    }
]

const events = [
    {
        title: "noche de juegos",
        description: "Tengo la casa pra mi solo, asi que organizo noche de juegos para el/la que quiera venir",
        location: "Calle Alcala 200",
        attendance: 6,
        gameDate: moment("20/05/2020 5:00PM", "DD/MM/YYYY h:mmA").parseZone().toDate(),
    },  
    {
        title: "noche de juegos",
        description: "Os invito a jugar a mi mansion",
        location: "Calle Alcala 180",
        attendance: 4,
        gameDate: moment("20/05/2020 5:00PM", "DD/MM/YYYY h:mmA").parseZone().toDate(),


    },
    {
        title: "Noche de trivial",
        description: "Por favor el que tenga el trivial que lo traiga, yo pongo la casa y la comida :D",
        location: "Calle Toledo 10",
        attendance: 7,
        gameDate: moment("20/05/2020 5:00PM", "DD/MM/YYYY h:mmA").parseZone().toDate(),

    },    
    {
        title: "Maraton de Time Stories",
        description: "Pues eso, jugamos al Time Stories hasta que aguante el cuerpo",
        location: "Calle Toledo 25",
        attendance: 10,
        gameDate: moment("20/05/2020 5:00PM", "DD/MM/YYYY h:mmA").parseZone().toDate(),

    }  
]

const games = [
    {
        title: 'Azul',
        description: "Cuando Manuel I el Afortunado, rey de Portugal, visitó el Palacio de la Alhambra, quedó cautivado por la imponente belleza de la decoración, formada por losetas de cerámica de procedencia árabe a las que llamaban “azulejos”. Aún fascinado por el esplendor del interior de la Alhambra, a su regreso a Portugal ordenó inmediatamente que las paredes de su palacio en Évora fueran decoradas del mismo modo. Por ello, debes convertirte en el artista preferido del rey para embellecer las paredes de su palacio. Elige tu estrategia con cuidado y acierta con las combinaciones.",
        author: "Michael Kiesling",
        gameImg: "https://static.carrefour.es/hd_510x_/crs/cdn_static/catalog/hd/330940_00_1.jpg",
        theme: "Estrategia Abstracta",
        ageRange: "8+",
        numOfPlayers: "2-4 Jugadores",
        gameTime: "30-45 Minutos",
        difficulty: "Facil",
        price: "39,90€",
        language: "Español"
    },
    {
        title: 'Time Stories',
        description: "T.I.M.E. es una agencia encargada de proteger a la humanidad mediante la prevención de defectos temporales. Los jugadores seréis agentes temporales, de manera que sus conciencias serán enviadas a los cuerpos de seres de diferentes mundos o realidades para completar con éxito las misiones que se asignen. Además, no os preocupéis por fracasar, porque el fracaso es imposible: podrás volver atrás en el tiempo tantas veces como sea necesario.",
        author: "Manuel Rozoy",
        gameImg: "https://apagatutv.files.wordpress.com/2017/07/img_9958.jpg",
        theme: "Detectivesca",
        ageRange: "14+",
        numOfPlayers: "2-4 Jugadores",
        gameTime: "90 Minutos",
        difficulty: "Dificil",
        price: "44,99€",
        language: "Español"
    },
    {
        title: 'Los Colonos de Catan',
        description: "El objetivo es colonizar la isla y lo conseguirás cuando acumules 10 ó más puntos los puntos que tienes que lograr en tu tirada, así que espabila y crea tu estrategia. Tendrás que mostrar tus dotes de comerciante: compra materias primas, vende las que producen tus campos y construye poblados, ciudades y carreteras. No es una tarea fácil porque ladrones, caballeros y ejércitos se cruzarán en tu camino. Si ganas una vez, no te hagas ilusiones, en cada partida la isla es diferente, no pienses que te servirá tu estrategia para la próxima. Cambiarán tus campos y tus materias primas, y puede que la suerte no te acompañe.",
        author: "Klaus Teuber",
        gameImg: "https://images-na.ssl-images-amazon.com/images/I/81G3u55HEHL._AC_SX425_.jpg",
        theme: "Gestión de recursos",
        ageRange: "10+",
        numOfPlayers: "3, 4 Jugadores",
        gameTime: "75 Minutos",
        difficulty: "Medio",
        price: "36,00€",
        language: "Español"
    },
    {
        title: 'Carcassonne',
        description: "¿Sabes quién tenía el poder en la Edad Media? ¿Y quién abastecía a las ciudades? Entonces en Carcassonne lo tienes fácil, pon al monje en el claustro y al granjero en el campo y lograrás muchos puntos al final del juego. Con la táctica trazada, saca una pieza, busca su posición lógica, suma al marcador los puntos que te corresponden y, si es el momento, pon un seguidor. Te lo repetimos: tienes que tener una estrategia. Sale una pieza que no te esperas… ¡puf! ¿No habrás pensando que tu estrategia inicial era definitiva? Si es así, lo sentimos, tendrás que cambiarla si quieres ganar. Cuando descubras lo divertido y sencillo qué es, comprueba que la esencia del juego se mantiene en todas sus expansiones. ¡Sigue pasándotelo bien!",
        author: "Klaus-Jürgen Wrede",
        gameImg: "https://sgfm.elcorteingles.es/SGFM/dctm/MEDIA03/201611/07/00197632101016____1__640x640.jpg",
        theme: "Gestión de recursos",
        ageRange: "10+",
        numOfPlayers: "2-5 Jugadores",
        gameTime: "35 Minutos",
        difficulty: "Facil",
        price: "22,50€",
        language: "Español"
    },
    {
        title: 'Dixit',
        description: "Sobre el tablero un conejo de diferente color por cada jugador. Preparados, listos…empiezas tú si la creatividad te viene innata y además estás inspirado porque seguro que ya tienes en mente la frase para alguna de tus cartas, o para todas, pero es una carta por turno. Serás el primer cuentacuentos de la partida. ¿En qué has pensado: un libro, una película, una canción o acudiste a tu imaginación? La dices en voz alta y todos se concentran para elegir entre sus cartas cuál coincide más con la frase. No lo pongas complicado porque nadie acertará, y será un turno en el que tu conejo no va a puntuar y lo mismo te va a ocurrir si es tan fácil que todos saben qué carta elegiste. Con las cartas de tus adversarios sobre la mesa, ahora viene lo mejor: tienen que adivinar cuál es tu carta. Parecen tranquilos, no se inquietan y, sin embargo, no es ilusión la viñeta pensativa que ves sobre sus cabezas: ¡podría ser cualquiera! ¡descarto la 2! ¡seguro es la 5! ¡Puf, ninguna carta describe la frase! ¿la 3 ó la 5? Tiene pinta de que dos de tus contrincantes la pueden averiguar… Si dos jugadores de cinco han adivinado tu carta, no está mal para empezar.",
        author: "Jean-Louis Roubira",
        gameImg: "https://images-na.ssl-images-amazon.com/images/I/71FpEEBMy5L._AC_SX466_.jpg",
        theme: "Cuentacuentos",
        ageRange: "8+",
        numOfPlayers: "3-6 Jugadores",
        gameTime: "30 Minutos",
        difficulty: "Facil",
        price: "29,95€",
        language: "Español"
    },
    {
        title: '7 Wonders',
        description: "El azar designa el tablero de la Maravilla con el que vas a jugar, cualquiera te va a gustar, todos tienen unos diseños sublimes, no tendrás preferencia por ninguno. Con tu Maravilla sobre la mesa, la finalidad es crear una civilización que te haga acumular más puntos de victorias que tus adversarios. El recuento se hace al término de cada Era, y el secreto para ganar es tener varias estrategias y utilizar la más efectiva en cada momento. El tiempo empieza a avanzar, estás en la Era I con 7 cartas iniciales y 3 monedas, así que elige una de las cartas, a la vez que el resto de los jugadores, para mejorar tu maravilla, construir una biblioteca o un comercio o ampliar tus recursos. Si ninguna opción de las anteriores te interesa, siempre puedes descartar la carta a cambio de monedas. ¿El problema es la falta de recursos para progresar? Tienes ciudades vecinas a tu izquierda y a tu derecha, aprovecha sus recursos, puedes comprarles aquellos que tú no generas, no olvides un dato importante: no se pueden negar con la entrega por tu parte de un par de monedas. Concluye la Era I y es la hora de contar los puntos de cada jugador. Una construcción siempre tiene valor, pero obtendrás más puntuación si tienes más edificios militares que tus vecinos porque recibes más puntos de victoria, si tienes menos, los recibes de derrota. En las Eras II y III la dinámica continúa igual, sólo ten en cuenta que las construcciones se complican, necesitas más recursos y los edificios militares valen más, y ya sabes que la fuerza militar te hace llegar con más puntos de victorias al final.",
        author: "Antoine Bauza",
        gameImg: "https://images-na.ssl-images-amazon.com/images/I/91mmWj3k0KL._AC_SY355_.jpg",
        theme: "Gestión de recursos",
        ageRange: "8+",
        numOfPlayers: "2-7 Jugadores",
        gameTime: "30 Minutos",
        difficulty: "Facil",
        price: "39,00€",
        language: "Español"
    },
    {
        title: 'Mysterium',
        description: "Sentaos alrededor de la mesa, abrid vuestra mente y despertad vuestro sexto sentido mientras os preparáis para una extraordinaria sesión con el objetivo de dar descanso a un alma en pena.",
        author: "Oleksandr Nevskiy, Oleg Sidorenko",
        gameImg: "https://static.fnac-static.com/multimedia/Images/ES/NR/da/c5/11/1164762/1540-1.jpg",
        theme: "Cooperativo - Misterio",
        ageRange: "10+",
        numOfPlayers: "2-7 Jugadores",
        gameTime: "42 Minutos",
        difficulty: "Facil",
        price: "39,00€",
        language: "Español"
    },
    {
        title: 'Mindtrap',
        description: "¡MindTrap no sólo desafía tu mente... sino también tu forma de ver el mundo!",
        author: "Juegos Spear",
        gameImg: "https://images-na.ssl-images-amazon.com/images/I/71D7tWcasRL._AC_SX425_.jpg",
        theme: "Logica",
        ageRange: "12+",
        numOfPlayers: "2 Jugadores o 2 Equipos",
        gameTime: "30 Minutos",
        difficulty: "Dificil",
        price: "24,90€",
        language: "Español"
    },
    {
        title: 'Exploding Kittens',
        description: "Exploding Kittens es un entretenido y emocionante juego de cartas que tiene mucho que ver con la ruleta rusa. Los jugadores van robando cartas hasta que a alguien le sale un Exploding Kitten y, cuando esto sucede, esa persona muere y queda eliminada de la partida (a no ser que tenga una carta de Desactivación, que permite desactivar al Exploding Kitten.",
        author: "Elan Lee, Matthew Inman, Shane Small",
        gameImg: "https://m.media-amazon.com/images/S/aplus-media/vc/ae5927c5-6812-4fe9-990f-8009bde5c4dd._CR0,0,300,300_PT0_SX300__.jpg",
        theme: "Animales",
        ageRange: "8+",
        numOfPlayers: "2, 3, 4, 5 Jugadores",
        gameTime: "15 Minutos",
        difficulty: "Facil",
        price: "19,99€",
        language: "Español"
    },
    {
        title: 'Patchwork',
        description: "Hoy en día, el Patchwork se considera un arte, en el cual se usan telas de calidad para crear un bello diseño. Piezas de diferentes telas producen unos resultados que pueden llegar a considerarse verdaderas obras de arte. Elaborar una preciosa colcha requiere mucho tiempo y esfuerzo, puesto que los retales disponibles no encajan fácilmente. Escoge tus parches sabiamente, colócalos en tu colcha, acumula una gran reserva de botones y no dejes demasiados huecos… o te costarán la partida.",
        author: "Uwe Rosenberg",
        gameImg: "https://www.planetongames.com/14049-large_default/patchwork.jpg",
        theme: "Abstracto",
        ageRange: "6+",
        numOfPlayers: "2 Jugadores",
        gameTime: "30 Minutos",
        difficulty: "Facil",
        price: "16,20€",
        language: "Español"
    },
    {
        title: 'Holmes, Sherlock & Mycroft',
        description: "La madrugada del 24 de febrero de 1895 una bomba estalla en el Parlamento de Londres. Al instante, las medidas de seguridad se activan y detienen al joven Michael Chapman, un obrero al que se relaciona con grupos anarquistas. Mycroft Holmes, al servicio de la Corona, es el encargado de investigar dicha relación para resolver si ha sido un caso aislado o un plan orquestado. Y todo parece fácil de resolver hasta que se entera que su hermano, el detective consultor Sherlock Holmes, ha sido contratado por los padres del joven que creen en la inocencia de su hijo. Ahora, las dos mentes más brillantes de Londres se enfrentan por conocer la implicación del joven Chapman. ¿Será parte de un grupo anarquista o solo un cabeza de turco?",
        author: "Diego Ibáñez 'Chemo'",
        gameImg: "https://jugandoenpareja.files.wordpress.com/2016/01/pic2431481_md.jpg",
        theme: "Gestion de Recursos",
        ageRange: "10+",
        numOfPlayers: "2 Jugadores",
        gameTime: "30 Minutos",
        difficulty: "Facil",
        price: "16,20€",
        language: "Español"
    },
    {
        title: 'Cortex Challenge',
        description: "Con Cortex Challenge pondrás a prueba tus habilidades visuales, tu agilidad mental, tu capacidad..., para ser el primero en completar tu puzzle-cerebro. Disfrutarás de 8 tipos de pruebas diferentes: memoria, laberintos, color, coordinación, repetición, frecuencia, razonamiento y pruebas táctiles. ¿Serás capaz de vencer en esta dura prueba?",
        author: "Asmodée",
        gameImg: "https://media.zacatrus.es/catalog/product/cache/f22f70ef8ee260256901b557cf6bf49a/c/o/cortex1.png",
        theme: "Habilidad Visual y Capacidad Mental",
        ageRange: "8+",
        numOfPlayers: "2, 3, 4, 5, 6 Jugadores",
        gameTime: "15 Minutos",
        difficulty: "Medio",
        price: "14,99€",
        language: "Español"
    },
    {
        title: 'Concept',
        description: "En Concept, tu objetivo es adivinar palabras a través de la asociación de iconos. Un equipo de dos jugadores -que estarán sentados el uno junto al otro- elige una palabra o frase que los demás jugadores deben adivinar. Actuando juntos, colocarán piezas sobre los iconos disponibles en el tablero de juego (con más o menos juicio). El primer jugador que descubra la palabra o frase recibirá 2 puntos y el equipo activo recibe puntos también. Al final de la partida, el jugador que más puntos tenga será el ganador. Un increíble juego que no puede venir con una mejor presentación: ya que no sólo ha sido premiado con el As d'Or 2014 (juego del año en Francia), sino que además es uno de los juegos nominado al Spiel des Jarhes 2014, uno de los galardones más reconocido del panorama lúdico internacional. Según el jurado: Una imagen vale más que mil palabras: el encanto de Concept reside en hacer que los jugadores acierten ideas mediante extraordinarias líneas de pensamiento. Concept es un juego innovador, que lleva a los jugadores que tratan de adivinar a tener una mente abierta para poder adaptarse a los 'saltos mentales' del resto de jugadores. Los patrones del pensamiento lineal se rompen rápidamente para entrar en un fascinante mundo de símbolos e iconos. El elegante diseño basado en el color blanco subraya, además, el carácter moderno del juego.",
        author: "Alain Rivollet",
        gameImg: "https://media.zacatrus.es/catalog/product/cache/f22f70ef8ee260256901b557cf6bf49a/c/o/concept.jpg",
        theme: "Habilidad Mental",
        ageRange: "10+",
        numOfPlayers: "4, 5, 6, 7, 8, +8 Jugadores",
        gameTime: "40 Minutos",
        difficulty: "Medio",
        price: "29,99€",
        language: "Español",
    },
    {
        title: 'Pandemic',
        description: "¡Nuevas pandemias amenazan el planeta, y sólo tus amigos y tú podéis combatirlas! Esta expansión te ofrece tres escenarios diferentes que otorgan nuevos elementos, peligros y estrategias a tus partidas: - El desafío de Hinterland presenta una terrible situación: ¡las enfermedades de los animales pasan a los humanos! - El desafío de las situaciones de emergencia nos enfrenta a lo imprevisto: diferentes tipos de acontecimientos y sucesos que os pondrán las cosas aún más difíciles. - El desafío del súper-virus presenta una quinta enfermedad... ¡y es intratable! ¿Podréis mantenerla bajo control mientras investigas contrarreloj?",
        author: "Matt Leacock",
        gameImg: "https://media.zacatrus.es/catalog/product/cache/f22f70ef8ee260256901b557cf6bf49a/p/a/pandemicestadoemergencia_caja.png",
        theme: "Gestión de recursos",
        ageRange: "10+",
        numOfPlayers: "2, 3, 4 Jugadores",
        gameTime: "45 Minutos",
        difficulty: "Medio",
        price: "49,99€",
        language: "Español"
    },
    {
        title: 'Star Wars Legión Caja básica',
        description: "El Imperio Galáctico ha subyugado a toda la galaxia valiéndose de una abrumadora superioridad militar que despliega con una crueldad sin parangón. Los heroicos soldados de la Alianza Rebelde se enfrentan valerosamente a su tiranía, atacando desde bases secretas en una jugada desesperada por neutralizar la maquinaria bélica imperial. Se trata de una contienda épica en la que cada batalla bien podría significar la diferencia entre la victoria y la derrota... ¡Vive las legendarias batallas terrestres de Star Wars! Lidera tus tropas en épicos enfrentamientos con el juego de miniaturas STAR WARS: LEGIÓN. Cada miniatura está esculpida con todo lujo de detalles para representar a los héroes, villanos, soldados y vehículos del universo de Star Wars. Esta caja básica contiene todo lo necesario para que dos jugadores puedan recrear una batalla entre las fuerzas del Imperio Galáctico y los combatientes de la Alianza Rebelde. ¡Constituye un punto de partida ideal para empezar tu colección de miniaturas de STAR WARS: LEGIÓN y construir tu propio ejército imperial o rebelde!",
        author: "Alex Davy",
        gameImg: "https://media.zacatrus.es/catalog/product/cache/f22f70ef8ee260256901b557cf6bf49a/s/t/star_wars_legion_caja_basica.jpg",
        theme: "Wargame",
        ageRange: "14+",
        numOfPlayers: "2 Jugadores",
        gameTime: "120 - 180 Minutos",
        difficulty: "Medio",
        price: "89,99€",
        language: "Español"
    },
    {
        title: 'Gaia Project',
        description: "Gaia Project es un increíble juego en el que cada jugador controla a una de las catorce facciones distintas que luchan por colonizar pacíficamente la galaxia. Cada facción tiene necesidades diferentes, y estas necesidades han llevado a las facciones a dominar la terraformación, ya que para crecer y desarrollarse deben terraformar los planetas vecinos de su entorno nativo, compitiendo con otros jugadores. Coloniza nuevos planetas y forma nuevas federaciones para lograr tus objetivos.",
        author: "Helge Ostertag, Jens Drögemüller",
        gameImg: "https://media.zacatrus.es/catalog/product/cache/f22f70ef8ee260256901b557cf6bf49a/s/t/star_wars_legion_caja_basica.jpg",
        theme: "Gestión de recursos",
        ageRange: "14+",
        numOfPlayers: "1, 2, 3, 4 Jugadores",
        gameTime: "60 - 150 Minutos",
        difficulty: "Dificil",
        price: "63,00€",
        language: "Español"
    }
]
const eventReview = [
    {
        text: "Hay que repetir"
    },
    {
        text: "Hay que repetir"
    },
    {
        text: "Lo que mas me ha gustado fueron los margaritas junto a la psicina"
    },
    {
        text: "Lo que mas me ha gustado fueron los margaritas junto a la psicina"
    }
]
const gameReviews = [
    {
        text: "Juegazo ideal para jugar de a dos"
    },
    {
        text: "Me ha encantado este juego, podria pasarme horas jugandolo"
    },
    {
        text: "Juegazo ideal para jugar en grupos grandes"
    },
    {
        text: "Me ha encantado este juego, podria pasarme horas jugandolo"
    }
]

let allGames = []
let allUsers = []
let allEvents = []
let allGameReviews = []
let allEventReviews = []


User.create(users)
    .then((usersCreated) => {
        console.log("usuarios: ", usersCreated)
        usersCreated.forEach(user => allUsers.push(user._id))
        return allUsers
    })
    .then(() => {
        Events.create(events)
            .then(eventsCreated => {
                console.log(eventsCreated)
                eventsCreated.forEach((event) => allEvents.push(event._id))
                return allEvents
            })
            .then(() => Events.findByIdAndUpdate(allEvents[0], {author: allUsers[0]}, {new:true}))
            .then(() => Events.findByIdAndUpdate(allEvents[1], {author: allUsers[1]}, {new:true}))
            .then(() => Events.findByIdAndUpdate(allEvents[2], {author: allUsers[2]}, {new:true}))
            .then(() => Events.findByIdAndUpdate(allEvents[3], {author: allUsers[5]}, {new:true}))
            .catch(err => console.log(err))
            .then(() => {
                Review.create(eventReview)
                    .then(ereviewsCreated => {
                        console.log(ereviewsCreated)
                        ereviewsCreated.forEach((review) => allEventReviews.push(review._id))
                        return allEventReviews
                    })
                    .then(() => Review.findByIdAndUpdate(allEventReviews[0], {author: allUsers[0], reviewedInEvent: allEvents[0]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allEventReviews[1], {author: allUsers[1], reviewedInEvent: allEvents[1]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allEventReviews[2], {author: allUsers[2], reviewedInEvent: allEvents[3]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allEventReviews[3], {author: allUsers[5], reviewedInEvent: allEvents[2]}, {new:true}))
                    .catch(err => console.log(err))
        })
        
        Games.create(games)
            .then(gamesCreated => {
                console.log(gamesCreated)
                gamesCreated.forEach((game) => allGames.push(game._id) )
                return allGames
            })
            .then(()=> Games.findByIdAndUpdate(allGames[0], {owner: allUsers[0]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[1], {owner: allUsers[1]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[2], {owner: allUsers[2]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[3], {owner: allUsers[3]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[4], {owner: allUsers[4]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[5], {owner: allUsers[5]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[6], {owner: allUsers[6]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[7], {owner: allUsers[1]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[8], {owner: allUsers[0]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[9], {owner: allUsers[2]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[10], {owner: allUsers[3]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[11], {owner: allUsers[4]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[12], {owner: allUsers[5]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[13], {owner: allUsers[6]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[14], {owner: allUsers[0]}, {new: true}))
            .then(()=> Games.findByIdAndUpdate(allGames[15], {owner: allUsers[1]}, {new: true}))
            .catch(err => console.log(err))
            .then(() => {
                Review.create(gameReviews)
                    .then(reviewsCreated => {
                        console.log(reviewsCreated)
                
                        reviewsCreated.forEach((review) => allGameReviews.push(review._id))
                        return allGameReviews
                    })
                    .then(() => Review.findByIdAndUpdate(allGameReviews[0], {author: allUsers[0], reviewedInGame: allGames[0]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allGameReviews[1], {author: allUsers[1], reviewedInGame: allGames[1]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allGameReviews[2], {author: allUsers[2], reviewedInGame: allGames[2]}, {new:true}))
                    .then(() => Review.findByIdAndUpdate(allGameReviews[3], {author: allUsers[3], reviewedInGame: allGames[3]}, {new:true}))
                    .then(() => mongoose.connection.close())
                    .catch(err => console.log(err))            
        })
    })
    .catch(err => mongoose.connection.close())