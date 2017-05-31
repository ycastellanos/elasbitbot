controller.hears(['futbolin'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var team = "yanier";
  var count = 1;
  try {
    myRegexp = /\[(.*?)\]/g;
    match = myRegexp.exec(message.text);
    team = match[1];
  } catch (err) {
    console.log(err);
    team = "yanier";
  }

  try {
    myRegexp = /(\d)/g;
    match = myRegexp.exec(message.text);
    count = match[1];
  } catch (err) {
    console.log(err);
    count = "1";
  }

  // Sanitize team
  team = team.toLowerCase();
  team = team.replace(" y ", " ");
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
  team = team.replace("tornes", "papo");
  team = team.replace("torne", "papo");
  team = team.replace("ytornes", "papo");
  team = team.replace("yordanis", "papo");
  team = team.replace("yornadi", "papo");
  team = team.replace("elisabet", "elisa");
  team = team.replace("elisabeth", "elisa");
  team = team.replace("eli", "elisa");
  team = team.replace("eliza", "elisa");
  teamPars = team.toLowerCase().split(" ");
  var teamParsSorted = teamPars.sort(function(a,b) {return a.localeCompare(b);} );
  console.log(teamParsSorted);
  teamSanitized = "";
  for (var i in teamParsSorted) {
    if (i < teamPars.length - 1)
      teamSanitized = teamSanitized + teamParsSorted[i] + "-";
    else
      teamSanitized = teamSanitized + teamParsSorted[i];
  }

  console.log(teamSanitized);

  if (teamSanitized == "yanier" || teamSanitized == "lourdes" || teamSanitized == "yahima" || teamSanitized == "papo" || teamSanitized == "jose"
  || teamSanitized == "lourdes-yahima"
  || teamSanitized == "lourdes-yanier"
  || teamSanitized == "lourdes-papo"
  || teamSanitized == "elisa-jose"
  || teamSanitized == "elisa-lourdes"
  || teamSanitized == "elisa-yahima"
  || teamSanitized == "jose-yanier"
  || teamSanitized == "yahima-yanier"){
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
        count : result[0].count + parseInt(count),
      };

      var options = {
         multi: false,
         upsert: false
      };

      var updated = db.futbolin_stats.update(query, dataToBeUpdate, options);
    } else {
      stat = {
        "team": teamSanitized,
        "count": parseInt(count),
      };
      db.futbolin_stats.save(stat);
    }
    bot.reply(message, "Vale lo tengo :thumbsup:");
  } else {
    bot.reply(message, "Nope, el equipo " + teamSanitized + " no lo tengo registrado, debe haber sido un partido amistoso...");
  }
});

controller.hears(['futbolin-ask'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {

  bot.reply(message, "Déjame revisar mis estadísticas...");

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
  result = result.sort(function(a,b) {return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);} );
  resultreverse = result.reverse();
  resultText = "Ve tu mismo/a, según mis registros este es el ranking de elasbit:\n";
  for (var i in resultreverse) {
    entity = resultreverse[i];
    resultText += entity.team + " - " + entity.count + "\n";
  }

  bot.reply(message, resultText);
});
