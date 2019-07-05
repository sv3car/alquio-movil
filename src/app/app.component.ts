import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { Splash } from '../pages/splash/splash'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              modalCtrl: ModalController) {
    platform.ready().then(() => {

      statusBar.styleLightContent();

      //splashScreen.hide();
      let splash = modalCtrl.create(Splash);
      splash.present();

      if (!localStorage.getItem('token') || localStorage.getItem('token') === "null") {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = StartPage;
      }
      
    });
  }
}
