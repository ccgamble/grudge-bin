const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.envPORT || 3000);
app.locals.title = 'Grudge Bin';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.locals.grudges = [
  {id: 1}
]

app.get('/', (request, response) => {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/api/grudges', (req, res) => {
  res.json(app.locals.grudges)
})
