import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalProvider } from '../../providers/global/global';
import {UserDetailPage} from '../user-detail/user-detail'

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  namePage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public globalProv: GlobalProvider,
              public alertCtrl: AlertController) {
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

  goToProfile():void{
    this.navCtrl.push(UserDetailPage);
  }

  closeSesion(){
    this.globalProv.crearConfirm("Cerrar sesión", "¿Esta seguro que desea cerrar la sesión actual?",
    () => {
      localStorage.setItem("token", null);
      this.navCtrl.setRoot(LoginPage);
      this.navCtrl.popToRoot();
      console.log('Sesión cerrada');
    },
    () => {
      console.log('No cerrada');
    }).present();
  }

  showDirecction() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addButton({
      text: 'Prueba',
      handler: data => {

      }
    });

    alert.addInput({
      type: 'radio',
      label: 'Blue',
      value: 'blue',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {

      }
    });
    alert.present();
  }


}
