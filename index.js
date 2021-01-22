//백엔드 서버의 시작점 
const express = require('express')
const app = express()
const port = 5000
const {User}  = require('./models/User')
const bodyParser  = require('body-parser');

const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(()=>console.log("MongoDB Connected..."))
.catch(err=>console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!히티하티호')
})

app.post("/register",(req,res)=>{
    //회원가입할때 필요한 정보를 client에서 가져오면
    //그것들을 DB에 넣어준다.
    const user = new User(req.body)

    //비밀번호 암호화

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).json({
            success:true
        })
    });//몽고디비 메서드(콜백함수)

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})