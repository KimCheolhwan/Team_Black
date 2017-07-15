Ionic2 
=========

### Ionic2는 타입스크립트로 작성되며 Angular2를 기반으로 한다.
<br />

Ionic2 프로젝트 폴더 구조
---------------------
<hr />

 ## src 폴더의 내용이 www 폴더로 변환되는 과정
* 모든 프로그래밍 작업은 src 폴더에서 진행한다.
* ionic serve로 앱을 실행하면 src폴더의 내용이 컴파일되고 합쳐져서 www 폴더로 저장된다.
* ionic serve로 앱 실행 전에는 www 폴더가 비어있다가, 첫 실행시 assets, build 폴더가 생성되고 index.html 파일등이 생성된다.
* src 폴더 내의 모든 scss 파일들이 css로 컴파일 되고 함쳐져서 www/build/main.css로 저장된다.
* src 폴더 내의 모든 ts 파일들은 js로 컴파일되고 합쳐져서 www/build/main.js로 저장된다.
* scss 파일을 추가하고자 한다면, src/pages 폴더 아래 꾸미고 싶은 탭 폴더 밑에 생성하면 된다.

<hr />

Ionic import와 export
--------------------
* import와 export 모두 타입스크립트 구문이다.
* import는 사용하고픈 모듈이 있을시에 선언한다.
* export의 경우에는 어떤 클래스를 다른 곳에서 import 해서 사용하고 싶다면,
* export임을 선언해주어야 한다.

ex)
<pre><code>import { StatusBar } from 'ionic-native';

export class MyApp{
	rootPage = HomePage;

	constructor(platform: Platform){
		platform.ready().then(() => {
			StatusBar.syleDefault();
		});
	}
}
</code></pre>


<hr />
 Decorator
---------------------

@Component
*컴포넌트 : 버튼, 아이콘, 메뉴, 툴바 등과 같이 앱을 구성요소나 전반적인 로직을 말한다.
         컴포넌트는 하나의 페이지에 한개 또는 여러개가 있을 수 있다. 

Decorator(꾸며줌)  =====> 클래스 앞에 @Component를 해주면 그 클래스는 컴포넌트가 된다.
		   
ex) 
<pre><code>@Component() class ABC{.....} 와 같이 하면 클래스 ABC는 컴포넌트가 된다.
    유사하게 @Pipe() class EFG{.....}이 되면 EFG는 파이프가 된다.
</code></pre>

클래스 멤버 변수에도 Decoration을 사용할 수 있다.<br />
ex)
<pre><code>@Input variable1   ---> 값을 외부로부터 받는 변수
@Output variable2  ---> 값을 외부로 내보내는 변수
</code></pre>

컴포넌트에는 하나의 객체 파라미터를 전달할 수 있는데 이를 메타데이터라고 한다.<br />
ex)  
<pre><code> @Component({...........})
            메타데이터(객체)

 @Component({
	selector:...  컴포넌트를 어디에 표시할지 결정
	template:...  컴포넌트 내용을 담는 곳
  })    		  
</code></pre>
<hr />
src/app/app.component.ts (App Component)
-----------------------------------------

App Component는 root 컴포넌트라고도 하는데 이는 가장 처음 실행되고 다른 모든 컴포넌트를 포함하기 떄문이다.

<pre><code>import { Component } from '@angular/core';   //컴포넌트 import
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({                    // 컴포넌트 Decoration
  templateUrl: 'app.html'       // 컴포넌트 메타데이터
})
export class MyApp {            // class 앞에 컴포넌트 데코레이션이 있으므로 
  rootPage:any = TabsPage;         MyApp 클래스는 컴포넌트가 되고 
                                   export도 있으므로 MyApp은 다른 곳에서도 
                                   import 해서 쓸수 있다.

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}</code></pre>
MyApp 컴포넌트를 시작으로해서 더 많은 컴포넌트를 추가하여 앱 내용을 표현한다.<br />
<br />
위의 코드를 보면 @Component 메타데이터에 templateUrl만 있고 selector가 없는데<br />
아이오닉2의 루트 컴포넌트에서는 selector 대신, ion-app을 사용한다.<br />
ion-app은 src 폴더의 index.html에 정의되어 있다.
<br />
<pre><code>< !-- Ionic's root component and where the app will load -->
< ion-app></ion-app >
</code></pre>
root component 는 app.component를 말한다.<br />
<br>
루트 컴포넌트를 조금 더 자세히 들여다 보자!
<pre><code>@Component({                    
  templateUrl: 'app.html'  
})
</code></pre>
컴포넌트 메타데이터로 template가 아닌 template가 정의되어 있는 templateurl이 있다.<br>
그럼 app.html로 가보자!
<pre><code>< ion-nav [root]="rootPage">< /ion-nav>
</code></pre>
\<ion-nav>라는 DOM 요소(DOM Element)가 있고, [root]라는 DOM 속성(DOM Property)가 있다.<br>
[root] 속성이 어떤 페이지가 Root Page 인지를 정의해준다.<br> 
Root Page는 각 화면의 가장 먼저 출력되는 페이지 이다.

<pre><code>import { TabsPage } from '../pages/tabs/tabs';

@Component({                    
  templateUrl: 'app.html'     
})
export class MyApp {           
  rootPage:any = TabsPage;        
</code></pre>
이 부분을 보면 TabsPage라는 변수명으로 pages/tabs 폴더에 tabs.html을 import 한다. 
<pre><code>< ion-tabs>
  < ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home">< /ion-tab>
  < ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
  < ion-tab [root]="tab3Root" tabTitle="Account" tabIcon="Account">< /ion-tab>
< /ion-tabs>
</code></pre>
이와 같이 내가 설정해놓은 세개의 탭 정보가 TabsPage에 담기고, 사용자가 각 탭을 선택할때마다 <br>
각 탭이 보여줘야할 rootPage도 변하게 된다.
<br>
<br>
정리하자면 @Component Decorator로 클래스를 Component로 만든다.<br>
앱 화면에 나타는 Page도 하나의 Component이며, 앱 실행시 가장 먼저 나타나는 페이지가 Root page 이다.<br>
Root Page는 app.components.ts에서 컴포넌트 메타데이터를 통해 ion-nav Dom 요소의 [root] 속성에 정의해 준다.<br>
 