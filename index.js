var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var router = express.Router();
var visitorRouter = require('./back/visitor-route');
var bodyParser = require('body-parser');

mongoose.connect(config.database);
mongoose.Promise = require('q').Promise;

var port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname));

app.use('/styles', express.static(__dirname + '/public/assets/styles'));
app.use('/images', express.static(__dirname + '/public/assets/images'));
app.use('/fonts', express.static(__dirname + '/public/assets/fonts'));
app.use('/js', express.static(__dirname + '/public/assets/js'));
app.use('/templates', express.static(__dirname + '/public/assets/templates'));

app.use('/api', router);
router.use('/visitors', visitorRouter);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log('Server is started on port ' + port);
});