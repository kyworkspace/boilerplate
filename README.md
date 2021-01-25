# Bolier Plate
  자세한 Process는 BolierPlate Korean.html에 있음
  인프런의 노드 리액트 기본 강의를 참고로 만들었음
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

  ### 로그아웃 기능
  로그아웃 하려는 유저를 데이터베이스에서 찾아서 , 그 유저의 토큰을 지워주면 된다.

  ## React 기능 적용
  원래는 Babel, Webpack을 설정해주어야 하지만 create-react-app을 이용해서 바로 만들수 있음
  ### npm, npx
  npm : Node Package Manager
  1. Registry 같은 저장소 역할, denpendency의 라이브러리를 담고 있음
  2. 배포를 할때 빌드를 하는데 "npm run build"를 사용
  3. npm에 관한것은 package.json에 보관됨
  4. local로 설치할때는 nodemodule에 저장됨(같은 프로젝트 or 패키지안)
  5. npm install -g 의 경우 글로벌로 받는 경우는 컴퓨터 안에 /bin 디렉토리에 저장됨
  6. 원래는 npm create-react-app 로 사용하지만 npx의 경우는 npm registry 에서 create-react-app을 찾아서 다운로드 없이 실행 시켜줌
  #### npx 장점
   1. Disk space를 낭비하지 않음
   2. 항상 최신버전을 사용할 수 있음
  ### Concurrently 이용해서 프론트, 백 서버 한번에 켜기
  여러개의 커맨드를 동시에 작동시킬수 있게 해주는 Tool
  npm install concurrently --save
  Root package.JSON에서 아래와 같이 script를 추가하면 됨
  "concurrently \"npm run backend\" \"npm run start --prefix client"
  프론트 스타트의 경우 prefix를 붙여서 해당 프로젝트 폴더명을 적어주면 같이 동작함