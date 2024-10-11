const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database.config');
const employeeroute = require('./routes/employee.routes');
const app = express();

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

db.init().catch(err => {
    console.error('Error initializing database: ', err);
    process.exit(1);
});

app.use('/', employeeroute)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})