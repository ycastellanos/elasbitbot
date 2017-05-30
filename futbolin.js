controller.hears(['futbolin'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var team = "yanier";
  try {
    myRegexp = /\[(.*?)\]/g;
    match = myRegexp.exec(message.text);
    team = match[1];
  } catch (err) {
    console.log(err);
    team = "yanier";
  }

  // Sanitize team
  team = team.toLowerCase();
  team = team.replace(" y ", "");
  team = team.replace("lurdes", "lourdes");
  team = team.replace("lurde", "lourdes");
  team = team.replace("yaima", "yahima");
  team = team.replace("yai", "yahima");
  team = team.replace("yay", "yahima");
  team = team.replace("yaimas", "yahima");
  team = team.replace("yahimas", "yahima");
  team = team.replace("yvigo", "yahima");
  team = team.replace("@yvigo", "yahima");
  team = team.replace("jos", "jose");
  team = team.replace("josfh", "jose");
  team = team.replace("joseito", "jose");
  team = team.replace("papo", "tornes");
  team = team.replace("torne", "tornes");
  team = team.replace("yordanis", "tornes");
  team = team.replace("yornadi", "tornes");
  team = team.replace("elisabet", "elisa");
  team = team.replace("elisabeth", "elisa");
  team = team.replace("eli", "elisa");
  team = team.replace("eliza", "elisa");
  teamPars = team.toLowerCase().split(" ");
  teamPars.sort(function(a,b) {return (a > b) ? 1 : ((b > a) ? -1 : 0);} );
  teamSanitized = "";
  for (var i in teamPars) {
    teamSanitized += teamPars[i] + " ";
  }

  var db = require('diskdb');
  var resolve = require('path').resolve;
  var folder = resolve('db/futbolin');
  var fs = require('fs');

  if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
  }
  db = db.connect(folder, ['futbolin_stats']);
  // leer primero si exista ya el registro esta
  result = db.futbolin_stats.find({team: teamSanitized});
  var stat = {};
  if (result.length > 0){
    var query = {
      team : teamSanitized
    };

    var dataToBeUpdate = {
      count : result[0].count + 1,
    };

    var options = {
       multi: false,
       upsert: false
    };

    var updated = db.futbolin_stats.update(query, dataToBeUpdate, options);
  } else {
    stat = {
      "team": teamSanitized,
      "count": 1,
    };
    db.futbolin_stats.save(stat);
  }



  bot.reply(message, "Vale lo tengo :thumbsup:");
});

controller.hears(['futbolin-ask'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {

  bot.reply(message, "Ok, déjame revisar mis estadísticas...");

  var today = new Date();
  var dateISO = today.toISOString();

  for (var i in message.entities) {
    entity = message.entities[i];
    if (entity.name == "datetime") {
      dateISO = entity.iso;
    }
  }

  var db = require('diskdb');
  var resolve = require('path').resolve;
  var folder = resolve('db/futbolin');
  var fs = require('fs');

  if (!fs.existsSync(folder)){
      fs.mkdirSync(folder);
  }


  db = db.connect(folder, ['futbolin_stats']);
  result = db.futbolin_stats.find();
  console.log(result);
  result.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);} );
  resultreverse = result.reverse();
  resultText = "Según mis registros este es el ranking de elasbit:\n";
  for (var i in resultreverse) {
    entity = resultreverse[i];
    resultText += entity.team + " - " + entity.count + "\n";
  }

  bot.reply(message, resultText);
});
