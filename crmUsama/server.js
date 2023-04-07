const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');


// body Parse midleware
app.use(express.json());
app.use(cookieParser());

//database config 

const db = config.get('mongoURI');

//connect to mongo 

mongoose.connect(db)
    .then(() => console.log('Mongo connected ...'))
    .catch(err => console.log(err))




// use app routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/agents', require('./routes/api/agents'));
app.use('/api/logout', require('./routes/api/logout'));

app.use('/api/agreement', require('./routes/api/agreement'));

app.use('/api/leads', require('./routes/api/leads'));
app.use('/api/leads/m', require('./routes/api/leads/assignM'));
app.use('/api/vendor', require('./routes/api/vendor'));

app.use('/api/leads/md', require('./routes/api/leads/leadM'));
app.use('/api/leads/agent', require('./routes/api/leads/leadAgent'));

app.use('/api/leads/update', require('./routes/api/leads/updateLead'));
app.use('/api/leads/status', require('./routes/api/leads/updateStatus'));
app.use('/api/leads/status/ms', require('./routes/api/leads/updateStatusM'));

app.use('/api/mail', require('./routes/api/mail'));

app.use('/api/seed/seed/seed', require('./routes/api/seed'));



// serve static assets if in production
// if(process.env.NODE_ENV === 'production'){

app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));

