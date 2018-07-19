var express = require('express');
var app = express();
var Client = require('mariasql');

var db = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'Feb101992'
});

app.set('port', 5000);

app.get('/test', function(req, res){
  db.query('SHOW DATABASES', function(err, rows){
    if (err)
      throw err;
    console.log(rows);
  })
  res.send({ express: 'Hello from Express!' });
});


app.listen(app.get('port'), function(){
  console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});
