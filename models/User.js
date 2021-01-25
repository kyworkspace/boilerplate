const mongoose = require('mongoose');


const bcrypt = require('bcrypt');
//salt를 이용해서 비밀번호 암호화
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';



const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },
    email :{
        type : String,
        trim : true,
        unigue : 1
    },
    password : {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength : 50,
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp :{ //토큰 유효기간
        type : Number
    }
});

userSchema.pre('save',function(next){//몽구스 메서드 'save' 전에 어떤 작업을 한다는뜻
    var user = this; //스키마 가져와서 비밀번호 가져옴

    //비밀번호를 바꿀때만 암호화 하도록 함
    if(user.isModified('password')){
     //비밀번호 암호화 시킴.
    //https://www.npmjs.com/package/bcrypt 참고

    bcrypt.genSalt(saltRounds,function(err,salt){
        if(err) return next(err); //next는 바로 다음 단계로 넘어가는 메서드. 여기서는 index에서 post하는 단계를 뜻함
        bcrypt.hash(user.password,salt,function(err,hash){
            //hash는 암호화된 비밀번호
            if(err) return next(err);
            user.password = hash ; //정상적으로 변환되면 비밀번호 변경
            next();
        })
    })
    }else{
        next();
    }

}) ; 

userSchema.methods.comparePassword = function(plainPassword,cb){
    //비밀번호 비교 메서드
    // plainPassword 123456
    // $2b$10$4edPWfG.0U7B1o0/lSli3e/N1IFXxws0ngRMckXSChGPr0jDyx5oK

    bcrypt.compare(plainPassword,this.password,function(err,isMatch){ //비크립트 함수. 암호화를 비교해줌
        if(err) return cb(err); //에러가 있으면 콜백함수에 에러를 담아 넘기고
        cb(null,isMatch) //에러가 없으면 에러자리에 null 두고 isMatch 값 true로 넘김
    })
}

const User = mongoose.model('User',userSchema);

module.exports={User}