var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.use(restify.queryParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'bd7a17f0-73bd-4a04-a08c-4eeffc6d4944',
    appPassword: 'toicpvOKrfshBGe8Snmpc3k'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("SCHIRESON");
});

server.get('/', restify.serveStatic({
 directory: __dirname,
 default: '/index.html'
}));

function respond(req, res, next) {
    res.send(req.params)
}

server.get('/botpoint/', respond)
