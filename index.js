//백엔드 서버의 시작점 
const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userKyp:1234@boilerplate.7ljgu.mongodb.net/<boilerplate>?retryWrites=true&w=majority',{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=>console.log("MongoDB Connected..."))
.catch(err=>console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})