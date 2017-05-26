/**
 * A Bot for Slack!
 */


/**
 * Define a function for initiating a conversation on installation
 * With custom integrations, we don't have a way to find out who installed us, so we can't message them :(
 */

 var dateOfBirth = "2017-05-26";
 var jokePool = [];
 jokePool[0] = 'No soy tu payaso personal, pero dale un vistazo a esto https://www.youtube.com/user/JustForLaughsTV!';
 jokePool[1] = 'La maestra cuelga un retrato del presidente Bush y pregunta a la clase: \n- ¿De quién es este retrato?.\nSilencio absoluto.\n- Les voy a ayudar un poquito. Por culpa de este señor estamos pasando hambre.\nPepito dice:\n- ¡Ah, maestra!, es que sin uniforme y sin barba no lo reconocía.';
 jokePool[2] = '- Marido: Cariño, estás preciosa.\n- Esposa: Dime algo que no sepa.\n- Marido: Estacionar';
 jokePool[3] = '¿Cómo se queda un mago después de comer?\nMagordito...';
 jokePool[4] = '¿Para qué va una caja al gimnasio?\n¡Para hacerse caja fuerte!';
 var helloPool = [];
 helloPool[0] = 'Que bola!';
 helloPool[1] = 'Que onda!';
 helloPool[2] = 'Como esta la timba!';
 helloPool[3] = 'Que vueltilla!';
 helloPool[4] = 'Que bolero!';
 helloPool[5] = 'Hola estimada/o';
 helloPool[6] = 'Dime jamon';
 helloPool[7] = 'Que bolerin, JAMON!';

function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}


/**
 * Configure the persistence options
 */

var config = {};
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
    };
}

/**
 * Are being run as an app or a custom integration? The initialization will differ, depending
 */

if (process.env.TOKEN || process.env.SLACK_TOKEN) {
    //Treat this as a custom integration
    var customIntegration = require('./lib/custom_integrations');
    var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
    var controller = customIntegration.configure(token, config, onInstallation);
} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
    //Treat this as an app
    var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
    console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
    process.exit(1);
}


/**
 * A demonstration for how to handle websocket events. In this case, just log when we have and have not
 * been disconnected from the websocket. In the future, it would be super awesome to be able to specify
 * a reconnect policy, and do reconnections automatically. In the meantime, we aren't going to attempt reconnects,
 * WHICH IS A B0RKED WAY TO HANDLE BEING DISCONNECTED. So we need to fix this.
 *
 * TODO: fixed b0rked reconnect behavior
 */
// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
});

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});


/**
 * Core bot logic goes here!
 */
// BEGIN EDITING HERE!

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!, jamons")
});

//Chistes
controller.hears('joke', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * jokePool.length);
    bot.reply(message, jokePool[index]);
});
controller.hears('chiste', 'direct_message,direct_mention', function (bot, message) {
  try {
    var jokeStr = "";
    var request = require('request');
    var op = Math.floor(Math.random() * 3);
    if (op == 0) {
      bot.reply(message, "Ok, dejame pensarlo...");
    }else if (op == 1){
      bot.reply(message, "Voy pa ti...");
    }else{
      bot.reply(message, "Perame...");
    }

    request('http://www.chistescortos.eu/random', function (error, response, body) {
      const cheerio = require('cheerio');
      const $ = cheerio.load(body);
      var jokeStr = $('a.oldlink').eq(0).text();
      if (jokeStr != ""){
        bot.reply(message, jokeStr);
      } else {
        var index = Math.floor(Math.random() * jokePool.length);
        bot.reply(message, jokePool[index]);
      }
    });

  } catch (err){
    var index = Math.floor(Math.random() * jokePool.length);
    bot.reply(message, jokePool[index]);
  }
});

// Preguntas
controller.hears('mejor en futbolin', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "En sentido general Elasbit Rocks en el fitboling, peor el mejor es Yanier Castellanos!");
});
controller.hears('campeon en futbolin', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "En sentido general Elasbit Rocks en el fitboling, peor el mejor es Yanier Castellanos!");
});
controller.hears('pollo', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "Este es un tema delicado, mejor no hablemos de eso.");
});
controller.hears('pollona', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "Este es un tema delicado, mejor no hablemos de eso.");
});

// Saludos
controller.hears('hi', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, helloPool[index]);
});
controller.hears('hola', 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears('hello', 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears("whats up", 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears("what's up", 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears("que bola", 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears("que vuelta", 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
controller.hears("que bolero", 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});

// La hora
controller.hears("what time is it", 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Tiempo de jugar FUTBOLIN!!!');
});
controller.hears("Que hora", 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Tiempo de jugar FUTBOLIN!!!');
});




controller.on('direct_message,mention,direct_mention', function (bot, message) {
   var date1 = new Date(dateOfBirth);
   var date2 = new Date();
   var timeDiff = Math.abs(date2.getTime() - date1.getTime());
   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
   if (diffDays == 1){
     bot.reply(message, 'Es conmigo?, no entendi :( mis capacidades aun son limitadas, solo tengo ' + diffDays + ' día de nacida');
   } else if (diffDays > 1){
     bot.reply(message, 'Es conmigo?, no entendi :( mis capacidades aun son limitadas, solo tengo ' + diffDays + ' días de nacida');
   } else {
     bot.reply(message, 'Es conmigo?, no entendi :( mis capacidades aun son limitadas solo tengo unas horas de nacida');
   }
});


/**
 * AN example of what could be:
 * Any un-handled direct mention gets a reaction and a pat response!
 */
//controller.on('direct_message,mention,direct_mention', function (bot, message) {
//    bot.api.reactions.add({
//        timestamp: message.ts,
//        channel: message.channel,
//        name: 'robot_face',
//    }, function (err) {
//        if (err) {
//            console.log(err)
//        }
//        bot.reply(message, 'I heard you loud and clear boss.');
//    });
//});
