var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('./dbcon.js')

mysql.db.connect(function(err){
  if(err){
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('RDS connection success!');
});

const staticFiles = express.static(path.join(__dirname, 'client/build'));

app.use(staticFiles);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('port', 5000);

app.use(express.static('client/src'))

const dbName = 'mhwCalculatorDB';

app.get('/weapon', function(req, res){
  mysql.db.query('SELECT *  FROM ' + dbName + '.weapon', function(err, results){
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
  mysql.db.query('SELECT *  FROM ' + dbName + '.weapon where weapon_id = ?', 
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

app.get('/monster-select', function(req, res){
  mysql.db.query('SELECT *  FROM ' + dbName + '.monster_part where name_id = ?', 
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
  if(req.body.class==0){
    mysql.db.query('SELECT * FROM ' + dbName + '.weapon', function(err, results){
      if (err){
        return res.send(err);
      }
      else{
        return res.json({ data: results })
      }
    })
  }
  else{
    mysql.db.query('SELECT * FROM ' + dbName + '.weapon w \
      INNER JOIN ' + dbName + '.weapon_list wl ON w.weapon_class = wl.weapon_list_id\
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
  mysql.db.query('SELECT * FROM ' + dbName + '.weapon_list', function(err, results){
    if (err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
});

app.get('/monster', function(req,res){
  mysql.db.query('SELECT * FROM ' + dbName + '.monster_list', function(err, results){
    if(err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
})

app.get('/monster-part', function(req, res){
  mysql.db.query('SELECT * FROM ' + dbName + '.monster_part', function(err, results){
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
  mysql.db.query('SELECT * FROM ' + dbName + '.monster_part WHERE name_id = ?',
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

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`App listening on ${port}`);
