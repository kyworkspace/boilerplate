//백엔드 서버의 시작점 
const express = require('express')
const app = express()

const {User}  = require('./models/User')
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');

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

app.post("/api/users/register",(req,res)=>{
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

app.post('/api/users/login',(req,res)=>{
  //요청된 이메일을 데이터 베이스에서 있는지 찾는다.
  User.findOne({email:req.body.email},(err,user)=>{ //몽고디비 함수
    if(!user){ //반환된 유저정보가 없는 경우
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
         res.cookie("x_auth",user.token) //이렇게 하면 웹 쿠키 부분에 x_auth 로 저장됨
         .status(200) //통신이 정상적일때
         .json({loginSuccess:true,userId : user._id}) //loginSuccess 부분을 true로 하고 user.id 반환 (HexString)
  
      })
    })
  })
})

//auth 권한 처리
app.get('/api/users/auth',auth,(req,res)=>{
  //auth 는 미들웨어
  // 여기까지 통과되면 req.token, req.user 정보 확인가능

    //클라이언트에 정보 전달 가능
    //role 0 ->일반 유저
    //role 1 -> 관리자
    res.status(200).json({
      _id : req.user._id,
      isAdmin : req.user.role === 0 ? false : true,
      isAuth : true,
      email : req.user.email,
      name : req.user.name,
      lastname : req.user.lastname,
      role : req.user.role,
      image : req.user.image
    })
})


app.get('/api/users/logout',auth,(req,res)=>{
  //로그인 된 상태이기 때문에 auth를 가져와 쓸수 있음
  User.findOneAndUpdate(
    {_id : req.user._id}, //아이디로 해당 정보를 찾아서
    {token : ""}, //token을 초기화 해주고
    (err,user)=>{
      if(err) return res.json({success:false,err});
      return res.status(200).send({
        success : true
      })
    })
})


app.get('/api/hello',(req,res)=>{
  res.send("하이염")
})


const port = 5000


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})