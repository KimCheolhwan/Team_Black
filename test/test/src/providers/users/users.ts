import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsersProvider {
  constructor(public http: Http) {
    console.log('Hello UsersProvider Provider');
  }

    loginUserInfo(user){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');  //headers를 포함안해주면 값이 안넘어감
      return  new Promise(resolve => {
        this.http.post('http://localhost:8080/api/login',JSON.stringify(user),{headers: headers})
                  .map(res=>res.json()) //mapping을 안하면 return값이 Response
                                        //mapping시 return값은 Object
                  .subscribe(data=>{
                    resolve(data);
                  });
                });
              }

    createUserInfo(user){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return  new Promise(resolve => {
        this.http.post('http://localhost:8080/api/create',JSON.stringify(user),{headers: headers})
                  .subscribe(data=>{
                    resolve(data);
                  });
                });
    }
    getCSS(message){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return  new Promise(resolve => {
        this.http.post('http://localhost:8080/tts',JSON.stringify(message),{headers: headers})
                  .subscribe(data=>{
                    console.log('user.ts');
                    resolve(data);
                  });
                });
    }

    // getUserInfo(){
    //   let headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   return new Promise(resolve=>{
    //     this.http.get('http://localhost:8080/api/login',{headers:headers})
    //               .subscribe(data=>{
    //                 resolve(data);
    //               });
    //             });
    // }



}
