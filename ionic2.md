# ionic2 Framework 분석 
[TOC]
___
## 1.아이오닉 프레임워크 컨셉
- 웹기반 기술(HTML, CSS, JavaScript)를 바탕으로 높은 성능의 모바일 앱을 만든다
- 각종 요소 설명
	- Components: 재사용성 있는 UI 요소
	- Naviagation의 동작: stack처럼 동작

## 2.설치
- need a recent version of Node.js
- Install Ionic CLI and Cordova

## 3.프로젝트 구조
- ./src/index.html: 앱의 메인 진입점, 스크립트, CSS 등의 설정 
	- < ion-app >, < script src="build/main.js" >< /script >
		- build/main.js is a concatenated file containing Ionic, Angular and your app’s JavaScript.

- ./src/: 아이오닉 앱이 동작하는 공간
	- src/app/app.module.ts 이 우리앱의 진입점이며 root module
	- src/app/app.component.ts: 앱의 루트 요소를 설정
		- setting our template to src/app/app.html > this is main template
	- Page의 만들기
		- 경로: ./src/pages/구분1
		- 구성요소: html, scss, ts
			- home.html: 페이지의 템플릿
			- home.ts: @Page가 정의되어 있는 너의 페이지의 TypeScript 부분
			- home.scss: a file to put any custom SASS styles for this page

## 4.기타 정리 필요
- Page 추가하기: https://ionicframework.com/docs//intro/tutorial/adding-pages/
- 