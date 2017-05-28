var jokePool = [];
jokePool[0] = 'No soy tu payaso personal, pero dale un vistazo a esto https://www.youtube.com/user/JustForLaughsTV!';
jokePool[1] = 'La maestra cuelga un retrato del presidente Bush y pregunta a la clase: \n- ¿De quién es este retrato?.\nSilencio absoluto.\n- Les voy a ayudar un poquito. Por culpa de este señor estamos pasando hambre.\nPepito dice:\n- ¡Ah, maestra!, es que sin uniforme y sin barba no lo reconocía.';
jokePool[2] = '- Marido: Cariño, estás preciosa.\n- Esposa: Dime algo que no sepa.\n- Marido: Estacionar';
jokePool[3] = '¿Cómo se queda un mago después de comer?\nMagordito...';
jokePool[4] = '¿Para qué va una caja al gimnasio?\n¡Para hacerse caja fuerte!';

//Chistes
controller.hears(['chiste'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  try {
    var jokeStr = "";
    var request = require('request');
    var op = Math.floor(Math.random() * 5);
    if (op == 0) {
      bot.reply(message, "Ok, dejame pensarlo...");
    }else if (op == 1){
      bot.reply(message, "Deja ver que puedo hacer...");
    }else if (op == 2){
      bot.reply(message, "Quizá pueda hacer algo por ti...");
    }else if (op == 3){
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
