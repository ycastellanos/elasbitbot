controller.hears(['tiempo'],'direct_message,direct_mention', RecastaiMiddleware.hears,function(bot, message) {
  bot.reply(message, "Todavía no se decir nada del tiempo, estoy esperando por Papo para que me enseñe");
});
