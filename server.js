const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex=require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgresDB=knex({
    client : 'pg',
    connection : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.status(200).json('Smart-Chip-API is Alive !!');
})

app.post('/signin', signIn.handleSignIn(postgresDB, bcrypt));

app.post('/register', register.handleRegister(postgresDB, bcrypt));

app.get('/profile/:id', profile.handleProfile(postgresDB));

app.put('/image', image.handleImage(postgresDB));

app.post('/requestapi', image.requestApi);

app.listen(process.env.PORT,()=>{
    console.log(`server is running smoothly on port ${process.env.PORT}`);
});