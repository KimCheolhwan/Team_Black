Ionic2 
=========

### Ionic2�� Ÿ�Խ�ũ��Ʈ�� �ۼ��Ǹ� Angular2�� ������� �Ѵ�.
<br />

Ionic2 ������Ʈ ���� ����
---------------------
<hr />

 ## src ������ ������ www ������ ��ȯ�Ǵ� ����
* ��� ���α׷��� �۾��� src �������� �����Ѵ�.
* ionic serve�� ���� �����ϸ� src������ ������ �����ϵǰ� �������� www ������ ����ȴ�.
* ionic serve�� �� ���� ������ www ������ ����ִٰ�, ù ����� assets, build ������ �����ǰ� index.html ���ϵ��� �����ȴ�.
* src ���� ���� ��� scss ���ϵ��� css�� ������ �ǰ� �������� www/build/main.css�� ����ȴ�.
* src ���� ���� ��� ts ���ϵ��� js�� �����ϵǰ� �������� www/build/main.js�� ����ȴ�.
* scss ������ �߰��ϰ��� �Ѵٸ�, src/pages ���� �Ʒ� �ٹ̰� ���� �� ���� �ؿ� �����ϸ� �ȴ�.

<hr />

Ionic import�� export
--------------------
* import�� export ��� Ÿ�Խ�ũ��Ʈ �����̴�.
* import�� ����ϰ��� ����� �����ÿ� �����Ѵ�.
* export�� ��쿡�� � Ŭ������ �ٸ� ������ import �ؼ� ����ϰ� �ʹٸ�,
* export���� �������־�� �Ѵ�.

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
*������Ʈ : ��ư, ������, �޴�, ���� ��� ���� ���� ������ҳ� �������� ������ ���Ѵ�.
         ������Ʈ�� �ϳ��� �������� �Ѱ� �Ǵ� �������� ���� �� �ִ�. 

Decorator(�ٸ���)  =====> Ŭ���� �տ� @Component�� ���ָ� �� Ŭ������ ������Ʈ�� �ȴ�.
		   
ex) 
<pre><code>@Component() class ABC{.....} �� ���� �ϸ� Ŭ���� ABC�� ������Ʈ�� �ȴ�.
    �����ϰ� @Pipe() class EFG{.....}�� �Ǹ� EFG�� �������� �ȴ�.
</code></pre>

Ŭ���� ��� �������� Decoration�� ����� �� �ִ�.<br />
ex)
<pre><code>@Input variable1   ---> ���� �ܺηκ��� �޴� ����
@Output variable2  ---> ���� �ܺη� �������� ����
</code></pre>

������Ʈ���� �ϳ��� ��ü �Ķ���͸� ������ �� �ִµ� �̸� ��Ÿ�����Ͷ�� �Ѵ�.<br />
ex)  
<pre><code> @Component({...........})
            ��Ÿ������(��ü)

 @Component({
	selector:...  ������Ʈ�� ��� ǥ������ ����
	template:...  ������Ʈ ������ ��� ��
  })    		  
</code></pre>
<hr />
src/app/app.component.ts (App Component)
-----------------------------------------

App Component�� root ������Ʈ��� �ϴµ� �̴� ���� ó�� ����ǰ� �ٸ� ��� ������Ʈ�� �����ϱ� �����̴�.

<pre><code>import { Component } from '@angular/core';   //������Ʈ import
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({                    // ������Ʈ Decoration
  templateUrl: 'app.html'       // ������Ʈ ��Ÿ������
})
export class MyApp {            // class �տ� ������Ʈ ���ڷ��̼��� �����Ƿ� 
  rootPage:any = TabsPage;         MyApp Ŭ������ ������Ʈ�� �ǰ� 
                                   export�� �����Ƿ� MyApp�� �ٸ� �������� 
                                   import �ؼ� ���� �ִ�.

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}</code></pre>
MyApp ������Ʈ�� ���������ؼ� �� ���� ������Ʈ�� �߰��Ͽ� �� ������ ǥ���Ѵ�.<br />
<br />
���� �ڵ带 ���� @Component ��Ÿ�����Ϳ� templateUrl�� �ְ� selector�� ���µ�<br />
���̿���2�� ��Ʈ ������Ʈ������ selector ���, ion-app�� ����Ѵ�.<br />
ion-app�� src ������ index.html�� ���ǵǾ� �ִ�.
<br />
<pre><code>< !-- Ionic's root component and where the app will load -->
< ion-app></ion-app >
</code></pre>
root component �� app.component�� ���Ѵ�.<br />
<br>
��Ʈ ������Ʈ�� ���� �� �ڼ��� �鿩�� ����!
<pre><code>@Component({                    
  templateUrl: 'app.html'  
})
</code></pre>
������Ʈ ��Ÿ�����ͷ� template�� �ƴ� template�� ���ǵǾ� �ִ� templateurl�� �ִ�.<br>
�׷� app.html�� ������!
<pre><code>< ion-nav [root]="rootPage">< /ion-nav>
</code></pre>
\<ion-nav>��� DOM ���(DOM Element)�� �ְ�, [root]��� DOM �Ӽ�(DOM Property)�� �ִ�.<br>
[root] �Ӽ��� � �������� Root Page ������ �������ش�.<br> 
Root Page�� �� ȭ���� ���� ���� ��µǴ� ������ �̴�.

<pre><code>import { TabsPage } from '../pages/tabs/tabs';

@Component({                    
  templateUrl: 'app.html'     
})
export class MyApp {           
  rootPage:any = TabsPage;        
</code></pre>
�� �κ��� ���� TabsPage��� ���������� pages/tabs ������ tabs.html�� import �Ѵ�. 
<pre><code>< ion-tabs>
  < ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home">< /ion-tab>
  < ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>
  < ion-tab [root]="tab3Root" tabTitle="Account" tabIcon="Account">< /ion-tab>
< /ion-tabs>
</code></pre>
�̿� ���� ���� �����س��� ������ �� ������ TabsPage�� ����, ����ڰ� �� ���� �����Ҷ����� <br>
�� ���� ��������� rootPage�� ���ϰ� �ȴ�.
<br>
<br>
�������ڸ� @Component Decorator�� Ŭ������ Component�� �����.<br>
�� ȭ�鿡 ��Ÿ�� Page�� �ϳ��� Component�̸�, �� ����� ���� ���� ��Ÿ���� �������� Root page �̴�.<br>
Root Page�� app.components.ts���� ������Ʈ ��Ÿ�����͸� ���� ion-nav Dom ����� [root] �Ӽ��� ������ �ش�.<br>
 