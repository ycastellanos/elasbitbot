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

// La hora
controller.hears(['hora es*\w+','hora son*\w+','horas son*\w+'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, 'Tiempo de jugar FUTBOLIN!!!');
});
