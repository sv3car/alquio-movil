import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  namePage : any;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public globalProv : GlobalProvider) {
    /**
     * Nombre de la Página
     */

    this.namePage = {
      name: 'about'
    };
  }

  backPage(){

    this.navCtrl.pop();

  }

}
