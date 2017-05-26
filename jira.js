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
  console.log(message);
  issueNumber = "";
  myRegexp = /([[A-Z][A-Z][A-Z][A-Z][A-Z]-\d+|A-Z][A-Z][A-Z]-\d+|[A-Z][A-Z][A-Z][A-Z]-\d+)/g;
  match = myRegexp.exec(message.text);
  issueNumber = match[1]
  jira.findIssue(issueNumber)
  .then(function(issue) {
    bot.reply(message, 'El estado del issue ' + issueNumber + ' es: ' + issue.fields.status.name);
  })
  .catch(function(err) {
    bot.reply(message, "No pude determinar el estado: " + err);
  });

});
