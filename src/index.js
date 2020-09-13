const express = require('express');
const bodyParser= require('body-parser')
const routes = require('./routes');
const cors = require('cors');

const app = express();
// EJS
app.use(express.static('./public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);