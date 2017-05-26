// Jira
var JiraApi = require('jira-client');

// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: 'elasbit.atlassian.net',
  username: 'ycastellanos@elasbit.com',
  password: '0ntheSp0t',
  apiVersion: '2',
  strictSSL: true
});

controller.hears('.*estado.*issue.*', 'direct_message,direct_mention', function (bot, message) {
  bot.reply(message, "OK dejame chequear eso... ");
  issueNumber = "";
  myRegexp = /([A-Z][A-Z][A-Z]-\d+|[A-Z][A-Z][A-Z][A-Z]-\d+|[A-Z][A-Z][A-Z][A-Z][A-Z]-\d+)/g;
  match = myRegexp.exec(message.text);
  issueNumber = match[1]
  jira.findIssue(issueNumber)
  .then(function(issue) {
    bot.reply(message, 'El estado del issue ' + issueNumber + ' ' + issue.fields.summary + ' es: ' + issue.fields.status.name);
    if (issue.fields.status.name == "Done"){
      bot.reply(message, 'Se gentil y felicita a ' + issue.fields.assignee.name + ' por el buen trabajo');
    } else {
      bot.reply(message, 'Pssss... por si te interesa, el issue esta asignado a ' + issue.fields.assignee.name + '. Ojo yo no he dicho nada');
    }
  })
  .catch(function(err) {
    bot.reply(message, "No pude determinar el estado: " + err);
  });

});
