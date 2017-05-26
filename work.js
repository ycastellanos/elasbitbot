// AWS
controller.hears('ip.*servidor.*qa', 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "Siempre se te olvida, es 52.27.252.244");
});
controller.hears('url.*bamboo', 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "Por enésima vez: https://build.elasbit.com");
});
controller.hears('url.*jira.*elasbit', 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "Deberías tenerla en un bookmark: https://elasbit.atlassian.net");
});
controller.hears(['url.*jira.*villaflores', 'url.*jira.*commercerocks'], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "Esta está difícil estas justificado https://commercerocks.atlassian.net");
});
