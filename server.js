const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('js-md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.title = 'Grudge Bin';
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


app.locals.grudges = []

app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/api/grudges', (req, res) => {
  res.json(app.locals.grudges)
})

app.post('/api/grudges', (req, res) => {
  const data = req.body
  const id = md5(data.description)
  const grudge = {id, data}
  
  app.locals.grudges.push(grudge);
  res.status(200).json(grudge);
})

app.get('/api/grudges/:id', (req, res) => {
  const data = app.locals.grudges.filter((grudge) => {
    return grudge.id === req.params.id
  });
  res.json(data)
});

app.put('/api/grudges/:id', (req, res) => {
  const id = req.params.id
  let newData = req.body

  const grudge = {id, newData}
  const index = app.locals.grudges.findIndex((i) => {
    return i.id == id
  })
  let oldData = app.locals.grudges[index].data
  oldData = Object.assign(oldData, newData)
  
  res.json(app.locals.grudges)
})

module.exports = app;