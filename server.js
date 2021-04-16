import { createRequire } from 'module';
const require = createRequire(
    import.meta.url
);
// import register from './conterollers/reigister.js'

const express = require('express');
const bodyParser =require('body-parser');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register =require('./conterollers/reigister.cjs');
const signin = require('./conterollers/signin.cjs');
const profile =require('./conterollers/profile.cjs');
const image =require('./conterollers/image.cjs');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'smart-brain'
  }
});

console.log(db.select('*').from('users').then(data =>{
    // console.log(data)
}));

const app = express();

app.use(cors())
app.use(bodyParser.json());


app.get('/',(req,res)=>{res.send(database.users)})


app.post('/signin', (req, res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register',(req,res)=>{register.handleRegister(req, res, db, bcrypt )})
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=>{image.handleApiCall(req,res)})

app.listen(3000)

/*
/ --> res = this is working
/ signin --> POST success/fail
/register --> POST = user
/ profile/:userID --> GET = user
/image --> PUT ==> user

*/