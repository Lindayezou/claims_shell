require('dotenv').config({ silent: true });
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/node-example';

require('./api/movie/movie.model');
require('./api/auth/user.model');
mongoose.connect(MONGO_URL, (err) => {
  console.log(err || `Connected MongoDB to: ${MONGO_URL}`);
  if (err) process.exit(1);
});

app.use('/lib', express.static('bower_components'));
app.use('/client', express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

app.use('/api/movies', require('./api/movie/movie.routes'));
app.use('/api/auth', require('./api/auth/auth.routes'));

app.get(/\/(api|client|lib).+/, (req, res, next) => {
  res.sendStatus(404);
});

app.get('/*', (req, res, next) => {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

if (process.env.NODE_ENV === 'development') {
  app.use((err: any, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err);
  });
} else {
  app.use((err: any, req, res, next) => {
    res.status(err.status || 500).send({ name: err.name, message: err.message});
  });
}

export let server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
