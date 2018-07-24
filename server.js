var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Client = require('mariasql');

var db = new Client({
  host: '127.0.0.1',
  user: 'root',
  password: 'Feb101992',
  db: 'test'
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('port', 5000);

app.get('/weapon', function(req, res){
  db.query('SELECT *  FROM `weapon`', function(err, results){
    if (err){
      return res.send(err);
    }
    else {
      return res.json({
        data: results
      })
    }
  })
});


app.get('/weapon-select', function(req, res){
  db.query('SELECT *  FROM `weapon` where weapon_id = ?', 
    [req.query.id], function(err, results){
    if (err){
      return res.send(err);
    }
    else {
      return res.json({
        data: results
      })
    }
  })
});


app.post('/weapon', function(req, res){
  console.log(req.body)
  if(req.body.class==0){
    db.query('SELECT * FROM `weapon`', function(err, results){
      if (err){
        return res.send(err);
      }
      else{
        return res.json({ data: results })
      }
    })
  }
  else{
    db.query('SELECT * FROM `weapon` w \
      INNER JOIN `weapon_list` wl ON w.weapon_class = wl.weapon_list_id\
      WHERE wl.name = ?',
      [req.body.class], function(err, results, fields){
        if(err){
          return res.send(err);
        }
        else {
          return res.json({ data: results })
        }
      })
  }
});

app.get('/weapon-type', function(req, res){
  db.query('SELECT * FROM `weapon_list`', function(err, results){
    if (err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
});


app.get('/monster', function(req,res){
  db.query('SELECT * FROM `monster_list`', function(err, results){
    if(err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
})


app.get('/monster-part', function(req, res){
  db.query('SELECT * FROM `monster_part`', function(err, results){
    if(err){
      return res.send(err);
    }
    else{
      console.log(results)
      return res.json({ data: results })
    }
  })
})


app.get('/hitzone', function(req, res){
  console.log(req.query.name)
  db.query('SELECT * FROM `monster_part` WHERE name_id = ?',
    [req.query.name], function(err, results){
      if(err){
        return res.send(err);
      }
      else{
        console.log(results)
        return res.json({
          data: results
        })
      }
    })
})

app.listen(app.get('port'), function(){
  console.log('Express started on port:' + app.get('port') + '; press Ctrl-C to terminate.');
});
