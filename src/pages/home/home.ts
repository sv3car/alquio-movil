import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { SingInPage } from '../sing-in/sing-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goLogin():void{
    this.navCtrl.push(LoginPage);
  }

  goSingIn():void{
    this.navCtrl.push(SingInPage);
  }
}
