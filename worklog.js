controller.hears(['worklog'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  var today = new Date();
  var dateISO = today.toISOString();
  var hours = "1h";
  console.log(message);
  try {
    myRegexp = /(\d+h)/g;
    match = myRegexp.exec(message.text);
    hours = match[1];
  } catch (err) {
    console.log(err);
    hours = "1h";
  }

  for (var i in message.entities) {
    entity = message.entities[i];
    if (entity.name == "datetime") {
      dateISO = entity.iso;
    }
  }

  var worklog = {
    "user": message.user,
    "date": dateISO.substring(0, 10),
    "hours": hours,
    "text": message.text
  };

  var db = require('diskdb');
  var resolve = require('path').resolve;
  var folder1 = resolve('db');
  var folder2 = resolve('db/' + worklog.date);
  var fs = require('fs');

  if (!fs.existsSync(folder1)){
      fs.mkdirSync(folder1);
  }
  if (!fs.existsSync(folder2)){
      fs.mkdirSync(folder2);
  }

  db = db.connect(folder2, ['worklogs']);
  db.worklogs.save(worklog);

  bot.reply(message, "Ok, anotado :thumbsup:");
});

controller.hears(['worklog-ask'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {

  bot.reply(message, "Ok, déjame revisar...");

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
  var folder1 = resolve('db');
  var folder2 = resolve('db/' + dateISO.substring(0, 10));
  var fs = require('fs');

  if (!fs.existsSync(folder1)){
      fs.mkdirSync(folder1);
  }
  if (!fs.existsSync(folder2)){
      fs.mkdirSync(folder2);
  }

  db = db.connect(folder2, ['worklogs']);
  result = db.worklogs.find({user : message.user});
  resultText = "Aquí tienes los mensajes que has logeado:\n";
  for (var i in result) {
    entity = result[i];
    resultText += entity.date + " - " + entity.hours + " - " + entity.text + "\n";
  }

  bot.reply(message, resultText);
});
