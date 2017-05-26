/**
 * A Bot for Slack!
 */


/**
 * Define a function for initiating a conversation on installation
 * With custom integrations, we don't have a way to find out who installed us, so we can't message them :(
 */

 var fs = require('fs');


 var dateOfBirth = "2017-05-26";



function onInstallation(bot, installer) {
    if (installer) {
        bot.startPrivateConversation({user: installer}, function (err, convo) {
            if (err) {
                console.log(err);
            } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
            }
        });
    }
}

/**
 * Configure the persistence options
 */

var config = {};
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
    };
}

/**
 * Are being run as an app or a custom integration? The initialization will differ, depending
 */

if (process.env.TOKEN || process.env.SLACK_TOKEN) {
    //Treat this as a custom integration
    var customIntegration = require('./lib/custom_integrations');
    var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
    var controller = customIntegration.configure(token, config, onInstallation);
} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
    //Treat this as an app
    var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
    console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
    process.exit(1);
}

// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
    var CronJob = require('cron').CronJob;

    new CronJob('0 0 9 ? * MON,TUE,THU,FRI *', () => {
      bot.say({
        text: "Hello motherfuckers, recuerden que estoy por aquí",
        channel: 'C5JEQD5FV'
      });
    }, null, true, 'America/Santiago');

    new CronJob('0 0 9 ? * MON,TUE,THU,FRI *', () => {
      bot.say({
        text: "Hello motherfuckers, recuerden que estoy por aquí",
        channel: 'C5JEQD5FV'
      });
    }, null, true, 'America/Santiago');

    new CronJob('0 0 13 ? * MON,TUE,THU,FRI *', () => {
      bot.say({
        text: "Ya va haciendo hambre, ¿quien va primero?",
        channel: 'C5JEQD5FV'
      });
    }, null, true, 'America/Santiago');

    new CronJob('0 0 19 ? * MON,TUE,THU,FRI *', () => {
      bot.say({
        text: "Let's go!!! llegaron las 7:00 PM",
        channel: 'C5JEQD5FV'
      });
    }, null, true, 'America/Santiago');
});

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});


/**
 * Core bot logic goes here!
 */
// BEGIN EDITING HERE!

controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "Estoy aqui, jamons")
});


// Includes
eval(fs.readFileSync('greetings.js')+'');
eval(fs.readFileSync('jokes.js')+'');
eval(fs.readFileSync('misc.js')+'');
eval(fs.readFileSync('weather.js')+'');
eval(fs.readFileSync('work.js')+'');
eval(fs.readFileSync('jira.js')+'');

controller.on('direct_message,mention,direct_mention', function (bot, message) {
   var date1 = new Date(dateOfBirth);
   var date2 = new Date();
   var timeDiff = Math.abs(date2.getTime() - date1.getTime());
   var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
   if (diffDays == 1){
     bot.reply(message, '¿Es conmigo?, no entendi, considera que mis capacidades aun son limitadas, solo tengo ' + diffDays + ' día de nacida');
   } else if (diffDays > 1){
     bot.reply(message, '¿Es conmigo?, no entendi, considera que mis capacidades aun son limitadas, solo tengo ' + diffDays + ' días de nacida');
   } else {
     bot.reply(message, '¿Es conmigo?, no entendi, considera que  mis capacidades aun son limitadas solo tengo unas horas de nacida');
   }
});
