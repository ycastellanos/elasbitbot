var helloPool = [];
helloPool[0] = 'Que bola! :sunglasses:';
helloPool[1] = 'Que onda! :sunglasses:';
helloPool[2] = 'Como esta la timba! :sunglasses:';
helloPool[3] = 'Que vueltilla! :sunglasses:';
helloPool[4] = 'Que bolero!';
helloPool[5] = 'Hola estimada/o';
helloPool[6] = 'Dime jamon :sunglasses:';
helloPool[7] = 'Que bolerin :sunglasses:';

var helloPoolYanier = [];
helloPoolYanier[0] = 'Que bola! :sunglasses:. Como te va con Lucas?';
helloPoolYanier[1] = 'Que onda! :sunglasses:. Lucas te dejo dormir?';
helloPoolYanier[2] = 'Como esta la timba! :sunglasses:';
helloPoolYanier[3] = 'Que vueltilla! :sunglasses:';
helloPoolYanier[4] = 'Que bolero!. Como va el Lucasnometro?';
helloPoolYanier[7] = 'Que bolerin :sunglasses:';

var helloPoolYanet = [];
helloPoolYanet[0] = 'Dime Tita :sunglasses:';

var helloPoolNorky = [];
helloPoolNorky[0] = 'Que bola asere :sunglasses:';

// Saludos
// controller.hears(['hola','hello','whats up','que bola','que vuelta','que vueltilla','que bolero','que bolerin'], 'direct_message,direct_mention', function (bot, message) {
//   console.log(message);
//   var index = Math.floor(Math.random() * helloPool.length);
//   bot.reply(message, helloPool[index]);
// });

controller.hears(['greetings'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  bot.api.users.info({user: message.user}, (error, response) => {
     var replyStr = "";
     if (response.user.name == "ycgcode"){
        var index = Math.floor(Math.random() * helloPoolYanier.length);
        bot.reply(message, helloPoolYanier[index]);
     } else if (response.user.name == "ysilvafdez"){
        var index = Math.floor(Math.random() * helloPoolYanet.length);
        bot.reply(message, helloPoolYanet[index]);
     } else if (response.user.name == "hgrafael2010"){
        var index = Math.floor(Math.random() * helloPoolNorky.length);
        bot.reply(message, helloPoolNorky[index]);
     } else {
        var index = Math.floor(Math.random() * helloPool.length);
        bot.reply(message, helloPool[index]);
     }
  });
});
