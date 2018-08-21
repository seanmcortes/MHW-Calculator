var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');


var db = mysql.createConnection({
  host: 'mhw-calculator-db.c2rhnqjzo1dk.us-east-2.rds.amazonaws.com',
  user: 'seancortes',
  password: 'Feb101992',
  port: '3306',
})

db.connect(function(err){
  if(err){
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log("test");
  console.log('RDS connection success!');


  db.query('SELECT *  FROM ' + dbName + '.weapon', function(err, results){
    if (err){
      console.log("error");
    }
    else {
      console.log(results);
    }
  })
  console.log("test");
});

const staticFiles = express.static(path.join(__dirname, '../client/build'));

app.use(staticFiles);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static('client/src'))

const dbName = 'mhwCalculatorDB'

app.get('/weapon', function(req, res){
  db.query('SELECT *  FROM ' + dbName + '.weapon', function(err, results){
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
  db.query('SELECT *  FROM ' + dbName + '.weapon where weapon_id = ?', 
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
  db.query('SELECT *  FROM ' + dbName + '.monster_part where name_id = ?', 
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
    db.query('SELECT * FROM ' + dbName + '.weapon', function(err, results){
      if (err){
        return res.send(err);
      }
      else{
        return res.json({ data: results })
      }
    })
  }
  else{
    db.query('SELECT * FROM ' + dbName + '.weapon w \
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
  db.query('SELECT * FROM ' + dbName + '.weapon_list', function(err, results){
    if (err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
});


app.get('/monster', function(req,res){
  db.query('SELECT * FROM ' + dbName + '.monster_list', function(err, results){
    if(err){
      return res.send(err);
    }
    else{
      return res.json({ data: results })
    }
  })
})


app.get('/monster-part', function(req, res){
  db.query('SELECT * FROM ' + dbName + '.monster_part', function(err, results){
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
  db.query('SELECT * FROM ' + dbName + '.monster_part WHERE name_id = ?',
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
