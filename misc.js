// Preguntas
controller.hears(['mejor.*futbolin,mejor.*footbolin','campeon.*futbolin,campeon.*footbolin'], 'direct_message,direct_mention', function (bot, message) {
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
answerPool[0] = 'Y esa p...?';
answerPool[1] = 'No te voy a responder...';
answerPool[2] = 'Y tu no?';
answerPool[3] = 'Mejor hago como que no leí...';
answerPool[4] = 'Voy a hacerme la idea de que no dijiste nada...';

controller.hears(['burra','mala','pesada','tonta', 'estupida'], 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * answerPool.length);
  bot.reply(message, answerPool[index]);
});

controller.hears(['fea'], 'direct_message,direct_mention', function (bot, message) {
  var index = Math.floor(Math.random() * answerPool.length);
  bot.reply(message, 'Como lo sabes si nunca me has visto? Te podria sorprender, al menos soy más joven que tu.');
});

// La hora
controller.hears(['hora es','hora son','horas son'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Tiempo de jugar FUTBOLIN!!!');
});

//Perra
controller.hears(['perra'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Grrrrrr, serás Lourdes? a que te muerdo para que te de rabia!!!');
});
