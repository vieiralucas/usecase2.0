const express = require('express');

const sequelize = require('./lib/models/sequelize');
const User = require('./lib/models/user');

const app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(`Express server running at ${app.get('port')}`);
  });
});

