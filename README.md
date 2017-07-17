IONIC2
======
# /hooks
## cordova 빌드과정의 일부로서 동작될 수 있는 스크립트 포함
## 앱을 패키지 할때 커스터마이징 가능
# /node_modules
## 필요한 모듈 라이브러리
## 이미 만들어져 있는 도구들을 설치
## 삭제되어도 package.json에 설정되어 npm install하면 되살아남
## 코드 백업할때 제외하고 백업
# /platforms
## 앱이 실제로 만들어진 결과물
# /plugins
## cordova plugin 설치 장소
## 개발하는 동안 크게 신경쓰지 않아도 됨
# /resourses
## icon, splash 두가지 자원 관리
# / src
## 실제로 코드를 작성
# /app
## 루트 컴포넌트
## html, scss, typescript
# /assets
## 정적인 파일 관리
## icon resourses에서 더 자주 사용
# /pages
## tabs 페이지에서 about, contact, home 세가지 페이지 확인 가능
# /theme
## 디자인 구성을 위한 코드 작성
## 개발자가 직접 만든 커스텀 디자인
## index.html
## <ion-app> 태그 앱의 시작지점
## 실제 앱 내용물 확인 가능
# / www
## 웹 브라우저 결과물 확인
## config.xml
## cordova 설정을 위한 파일
## package name, version, app name, splash 화면 등 app 전체에 대한 설정
## package.json
## npm 으로 설치되는 모든 모듈에 대한 설정
