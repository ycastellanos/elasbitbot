var helloPool = [];
helloPool[0] = 'Que bola!';
helloPool[1] = 'Que onda!';
helloPool[2] = 'Como esta la timba!';
helloPool[3] = 'Que vueltilla!';
helloPool[4] = 'Que bolero!';
helloPool[5] = 'Hola estimada/o';
helloPool[6] = 'Dime jamon';
helloPool[7] = 'Que bolerin, JAMON!';

// Saludos
// controller.hears(['hola','hello','whats up','que bola','que vuelta','que vueltilla','que bolero','que bolerin'], 'direct_message,direct_mention', function (bot, message) {
//   console.log(message);
//   var index = Math.floor(Math.random() * helloPool.length);
//   bot.reply(message, helloPool[index]);
// });

controller.hears(['greetings'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  console.log(message);
  var index = Math.floor(Math.random() * helloPool.length);
  bot.reply(message, helloPool[index]);
});
