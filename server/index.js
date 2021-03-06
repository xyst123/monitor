const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./graphql');
const router = require('./router');

const app = express();

app.use('/sdk', express.static(__dirname + '/sdk'));
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());

// 允许跨域访问
app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET,OPTIONS');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

app.use('/monitor', graphqlHTTP({
	schema: rootSchema,
	graphiql: true
}))
app.use('/collect', router.collect);

app.listen(8001);