const protocol= 'http'
const host = '127.0.0.1'
const port = 8081

let convert = require('./convertFunctions.js');
let bodyParser = require("body-parser");
let express = require('express');
let cors = require('cors');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const prefix = protocol + '://' + host + ':' + port + '/';

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./url-db/urls.db', (err) => {
   if (err) {
     return console.error(err.message);
   }
   console.log('Connected to the SQlite database.');
 })
 

 app.get('/error_404', function (req, res) {
   res.send("no such page exists")
})

app.get('/:shortURL', function (req, res) {
   id = convert.shortURLtoID(req.params.shortURL)
   db.get('SELECT * FROM urls WHERE id = ? ORDER BY rowid ASC LIMIT 1', [id], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row
        ? res.redirect(row.url)
        : res.redirect('/error_404');
    })
})

app.post('/create-short', (req, res) => {
   db.run(`INSERT INTO urls(url) VALUES(?)`, [req.body.url], function(err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          db.get('SELECT * FROM urls WHERE url = ? ORDER BY rowid ASC LIMIT 1', [req.body.url], (err, row) => {
            if (err) {
              return console.error(err.message);
            }
            res.send({shortURL:prefix + convert.idToShortURL(row.id)})
          })
        }
        return console.log(err.message);
      }
      res.send({shortURL:prefix + convert.idToShortURL(this.lastID)});
    });
})

let server = app.listen(port, function () {
   console.log("Example app listening at %s://%s:%s",protocol, host, port)
})