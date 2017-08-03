import { Component } from '@angular/core';
import { ModalController, NavController, AlertController, LoadingController,ViewController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users'
import { ResultPage } from '../result/result'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user_id:string='';
  user_password:string='';
  create_user_id:string='';
  create_user_password:string='';
  create_user_nickname:string='';
  users : any;

  constructor(public modalCtrl:ModalController,public userService: UsersProvider,public navCtrl: NavController, public alertCtrl: AlertController,public loadingCtrl:LoadingController,public viewCtrl:ViewController) {

  }

  ionViewDidLoad(){
  }

  login(){
    let options = {
        id:this.user_id,
        password:this.user_password
    };
    this.userService.loginUserInfo(options).then((data)=>{
      if(data===false){
                let alert = this.alertCtrl.create({
                  title: 'Oops!',
                  subTitle: '로그인 실패',
                  buttons: ['Ok']
                });
                alert.present();
              }else{
                this.navCtrl.push(ResultPage,{
                  users:data
                });
              }
    },(err)=>{
      console.log('error');
    });
  }

  register(){
    let options = {
      id:this.create_user_id,
      password:this.create_user_password,
      nickname:this.create_user_nickname
    };
    this.userService.createUserInfo(options).then((data)=>{
      if(data["_body"]==='true'){
                let alert = this.alertCtrl.create({
                    title: 'Good!',
                    subTitle: '만들어짐.',
                    buttons: ['Ok']
                });
                alert.present();
              }else{
                let alert = this.alertCtrl.create({
                    title: 'Oops!',
                    subTitle: '사용중인 아이디입니다',
                    buttons: ['Ok']
                });
                alert.present();
              }
    },(err)=>{
        console.log('error');
      });
    }
}