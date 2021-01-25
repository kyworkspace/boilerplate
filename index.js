//백엔드 서버의 시작점 
const express = require('express')
const app = express()
const port = 5000
const {User}  = require('./models/User')
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
//application/json
app.use(bodyParser.json());
//cookie-parser
app.use(cookieParser());

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

});

app.post('/login',(req,res)=>{
  //요청된 이메일을 데이터 베이스에서 있는지 찾는다.
  User.findOne({email:req.body.email},(err,user)=>{ //몽고디비 함수
    if(!user){
      return res.json({
        loginSuccess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

  //요청된 이메일이 데이터 베이스에 있다면 비밀번호 확인
  user.comparePassword(req.body.password, (err,isMatch)=>{
      if(!isMatch){
        return res.json({loginSuccess:false, message:"비밀번호 틀림"})
      }
      //비밀번호가 맞으면 Token 생성  
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        // 토큰을 저장한다. 어디? 쿠키, 로컬 스토리지, 등등에 저장가능
        // 이번에는 쿠키
         res.cookie("x_auth",user.token)
         .status(200)
         .json({loginSuccess:true,userId : user._id})
        //이렇게 하면 웹 쿠키 부분에 x_auth 로 저장됨
  
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})