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
    // Decode the object from the request
    var query_string = new Buffer(req.params['input'], 'base64').toString('ascii');
    var input_object = JSON.parse(query_string);
    var return_object = { "success" : true,
        "respondent_id" : input_object.respondent_id,
        "last_question_id" : input_object.last_question_id,
        "value" : input_object.value };
    var returnBuffer = new Buffer(JSON.stringify(return_object)).toString("base64");
    res.send(returnBuffer);
}

server.get('/botpoint/', respond)
