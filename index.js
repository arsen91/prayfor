var express = require('express');
var app = express();

var port = process.env.PORT || '3000';
app.use(express.static(__dirname));

app.use('/styles', express.static(__dirname + '/public/assets/styles'));
app.use('/images', express.static(__dirname + '/public/assets/images'));
app.use('/fonts', express.static(__dirname + '/public/assets/fonts'));
app.use('/js', express.static(__dirname + '/public/assets/js'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function() {
    console.log('Server is started on port ' + port);
});