const express =  require('express')
//const cors = require('cors')
const app = express();
//const {pool}=require('./dbConfig')
//const ejs = require('ejs')
//app.use(cors())

//app.set('view engine','ejs')
//app.use(express.urlencoded({ extended: false}))

const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/users/register', (req, res)=>{
    res.render('register')
})

app.get('/users/login', (req, res)=>{
    res.render('login')
})

app.get('/users/dashboard', (req, res)=>{
    res.render('dashboard', {user: 'Khanya'})
})



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})