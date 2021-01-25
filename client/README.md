# Simple React
  ### 2021-01-25
  Redux를 위한 폴더
  _action
  _reducer

  Routing 관련일을 처리하는 곳
  App.js

  환경변수를 설정하는 곳
  config.js

  하이어오더컴포넌트를 설정하는곳
  hoc
  
  #### axios downlaod
  했던거지만 복습한다 셈치고 공부공부
  npm install axios --save

  #### CORS 이슈
  server가 포트가 5000이고 클라이언트가 3000일때 따로 설정해주지 않으면 코스 정책에 의해 막힘(보안이슈)
  Cross Oring Resourece Sharing(CORS)
  해결하는 방법은 여러가지가 있다.
  1. 개발자 도구만 이용할수도 있고,
  2. JSONP를 사용해서 모든 리퀘스트를 get으로 바꿀수 있지만 제한적임
  3. 모든 요소를 컨트롤 할 상황이 된다면 서버에서 클라 정보를 받았을 때 부분 허용하는 것으로 가는 법
  4. Proxy를 사용할수도 있다.
  https://create-react-app.dev/docs/proxying-api-requests-in-development
    1. 모듈 다운 npm install http-proxy-middleware --save
    2. src에 setupProxy.js 파일을 만들어서 규칙을 저장함