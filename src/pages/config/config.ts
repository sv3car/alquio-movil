import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  namePage: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public globalProv: GlobalProvider) {
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

  closeSesion(){
    this.globalProv.crearConfirm("Cerrar sesión", "¿Esta seguro que desea cerrar la sesión actual?", 
    () => {
      localStorage.setItem("token", null);
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
      console.log('Sesión cerrada');
    },
    () => {
      console.log('No cerrada');
    }).present();
  }

}
