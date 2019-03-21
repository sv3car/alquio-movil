import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  namePage: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    /**
     * Nombre de la Página
     */
    this.namePage = {
      name: 'config'
    };
  }

  backPage():void{
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

}
