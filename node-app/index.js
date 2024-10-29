const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'people_db'
};

const connection = mysql.createConnection(config);

const names = ['Wesley', 'Williams', 'Ana', 'Bruno', 'Carla', 'Diego', 'Fernanda', 'Gabriel', 'Hugo', 'Isabela'];

app.get('/', (req, res) => {
  const randomName = `${names[Math.floor(Math.random() * names.length)]}`;
  connection.query(`INSERT INTO people(name) VALUES('${randomName}')`, (err) => {
    if (err) throw err;

    connection.query('SELECT id, name FROM people', (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1>';
      response += '<ul>';
      results.forEach(person => {
        response += `<li>${person.id} - ${person.name}</li>`;
      });
      response += '</ul>';

      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
