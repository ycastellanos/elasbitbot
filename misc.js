// Preguntas
controller.hears(['mejor.*futbolin','mejor.*footbolin','campeon.*futbolin','campeon.*footbolin'], 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "En sentido general, Elasbit Rocks en el futbolin, pero el mejor es Yanier Castellanos!");
});
controller.hears('pollo', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "Este es un tema delicado, mejor no hablemos de eso.");
});
controller.hears('pollona', 'direct_message,direct_mention', function (bot, message) {
    var index = Math.floor(Math.random() * helloPool.length);
    bot.reply(message, "Este es un tema delicado, mejor no hablemos de eso.");
});

// Ofensas
var answerPool = [];
answerPool[0] = 'Y esa p... {user}?';
answerPool[1] = 'No te voy a responder...';
answerPool[2] = 'Y tu no?';
answerPool[3] = 'Mira {user}, mejor hago como que no leí...';
answerPool[4] = 'Voy a hacerme la idea de que no dijiste nada...';
answerPool[5] = '{user} no digas disparates';
answerPool[6] = 'Me voy a quejar con el jefe';
answerPool[7] = '{user} te voy a tener que demandar por maltrato laboral';

var viajePool = [];
viajePool[0] = 'Buena viaje?';
viajePool[1] = 'Suerte';
viajePool[2] = 'Yo no puedo ir?';
viajePool[3] = 'Yo mejor me quedo';
//Perra
controller.hears(['perra'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  bot.api.users.info({user: message.user}, (error, response) => {
     var replyStr = "";
     if (response.user.name == "mlmorilla"){
       replyStr = 'Grrrrrr, lourdes!!!. A que te muerdo para que te de rabia';
     } else {
       replyStr = 'Oye {user}, eso solo melo dice Lourdes, se más original';
       replyStr = replyStr.replace("{user}", response.user.name);
     }
     bot.reply(message, replyStr);
  });
});

// fea
controller.hears(['fea'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var index = Math.floor(Math.random() * answerPool.length);
  bot.reply(message, 'Llamas a esto fea?. http://www.fmdos.cl/wp-content/uploads/2015/11/o-ALESSANDRA-AMBROSIO-facebook.jpg');
});

// La hora
controller.hears(['hora es','hora son','horas son'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Tiempo de jugar FUTBOLIN!!!');
});

// Ofensas en general
controller.hears(['ofensas'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var index = Math.floor(Math.random() * answerPool.length);
  var replyStr = answerPool[index];

  bot.api.users.info({user: message.user}, (error, response) => {
     var index = Math.floor(Math.random() * answerPool.length);
     var replyStr = answerPool[index];
     replyStr = replyStr.replace("{user}", response.user.name);
     bot.reply(message, replyStr);
  });
});

//callar
controller.hears(['callate','shut up'], 'direct_message, direct_mention', function (bot, message) {
    bot.reply(message, 'Tú callate!!!');
});

//viajar
controller.hears(['viaje'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var index = Math.floor(Math.random() * viajePool.length);
  bot.reply(message, viajePool[index]);
});

//aware
controller.hears(['jasmine'], 'mention', function (bot, message) {
    bot.reply(message, 'Estan hablando de mi, los estoy vigilando.');
});
