import { Component } from '@angular/core';
import { Platform, /*NavController*/ } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(//public navCtrl: NavController,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
      if (localStorage.getItem('token') === "null") {
        this.rootPage = HomePage;
      } else {
        this.rootPage = StartPage;
      }
    });
  }
}
