## 2021-01-22  
First init  
PostMan 추가  
nodemon으로 변동상황 즉각반영으로 바꿈
mongo key값 숨김
bcrypt  

  ## 2021-01-25
  ### 로그인 기능
  #### 웹 토큰 생성 라이브러리 추가
  npm install jsonwebtoken --save
  #### 쿠키파서 라이브러리 추가
  npm install cookie-parser --save
  user_id ==> 쿠키에 넣으려면 toHexString

  ### Auth 기능
  페이지가 이동 할때 마다 쿠키에 들어있는 토큰과 DB 들어있는 토큰이 같은지를 비교하여 활동 권한을 부여
  middleware 폴더에 auth를 처리해서 인증