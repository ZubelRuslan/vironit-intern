const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:filename', (req, res) => {
  fs.readFile(
    path.join(__dirname, req.params.filename + '.txt'),
    (err, data) => {
      if (err) {
        res.status = 400;
        res.setHeader('Content-Type', 'text/html');
        res.send('<h1>No such file</h1>');
        res.end();
      } else {
        res.status = 200;
        res.setHeader('Content-Type', 'text/html');
        res.send(`<h1>Data in the file:</h1><p>${data}</p>`);
        res.end();
      }
    }
  )
});

app.post('/:filename', (req, res) => {
  fs.readFile(
    path.join(__dirname, req.params.filename + '.txt'),
    err => {
      if (err) {
        fs.writeFile(
          req.params.filename + '.txt',
          // add some certain key below after body to write it's value in file
          req.body,
          err => {
            if (err) throw new Error(err);
          }
        );
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.send(`<h1>File ${req.params.filename.toUpperCase()} created</h1>`);
        res.end();
      } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        res.send(`<h1>File with name ${req.params.filename.toUpperCase()} already exist</h1>`);
        res.end();
      }
    }
  );
});

app.put('/:filename', (req, res) => {
  fs.appendFile(
    path.join(__dirname, req.params.filename + '.txt'),
    // add some certain key below after body to write it's value in file
    req.body,
    err => {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.send(`<h1>File with name ${req.params.filename.toUpperCase()} already exist</h1>`);
      res.end();
    }
  );
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send(`<h1>File ${req.params.filename.toUpperCase()} updated</h1>`);
  res.end();
});

app.delete('/:filename', (req, res) => {
  fs.unlink(
    path.join(__dirname, req.params.filename + '.txt'),
    () => {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.send(`<h1>File with name ${req.params.filename.toUpperCase()} doesn't exist</h1>`);
      res.end();
    }
  );
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send(`<h1>File ${req.params.filename.toUpperCase()} deleted</h1>`);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});