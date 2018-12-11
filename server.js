const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to log the request');
    }
  })
  next();
});

/* app.use((req, res, next) => {
  res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    description: 'Welcome to my page!'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.listen(3000, () => {
  console.log('Server is running');
});