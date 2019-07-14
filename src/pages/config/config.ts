import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GlobalProvider } from '../../providers/global/global';
import {UserDetailPage} from '../user-detail/user-detail';
import {LegalInformation} from '../information/legal-information'
import { CalidadImagen } from '../calidadimagen/calidadimagen';
import { PoliticasPage } from '../politicas/politicas';
import { CalificaPage } from '../califica/califica';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  namePage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public globalProv: GlobalProvider,
              public alertCtrl: AlertController,
              public modCtrl: ModalController,
              public popoverCtrl: PopoverController) {
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

  presentCalidadImagen() {
    let calidadmodal = this.modCtrl.create(CalidadImagen, null, {cssClass: 'calidadimagen'});
    calidadmodal.present();
  }

  gotoLegalInformation(){
    let legalmodal = this.modCtrl.create(LegalInformation, {}, {cssClass: 'legalinformation'});
    legalmodal.present();
  }

  gotoPoliticasPage(){
    let politicasmodal = this.modCtrl.create(PoliticasPage, {}, {cssClass: 'politicaspage'});
    politicasmodal.present();
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

  Borrarhistorial(){
    let alert = this.alertCtrl.create({cssClass: 'Alerts'});
    alert.setTitle('¿Desea eliminar <br />el historial?');

    alert.addButton({
      text: 'Cancelar',
      cssClass: 'cancel'
    });
    alert.addButton({
      text: 'Eliminar',
      cssClass: 'main',
      handler: data => {

      }
    });
    alert.present();
  }

  Sugerencias(){
    let alert = this.alertCtrl.create({cssClass: 'sugerencias'});
    alert.addInput({
      type: 'text',
      placeholder: 'Escribe tu sugerencia aquí...'
    });
    alert.addButton({
      text: 'Cancelar',
      cssClass: 'cancel'
    });
    alert.addButton({
      text: 'Enviar',
      cssClass: 'main',
      handler: data => {

      }
    });
    alert.present();
  }

  gotoCalifica() {
    let calificamodal = this.modCtrl.create(CalificaPage, null, {cssClass: 'califica'});
    calificamodal.present();
  }

  gotoNotificaciones(){
    let alert = this.alertCtrl.create({cssClass: 'Alerts'});
    alert.setTitle('Notificaciones');
    let NOTIFICATIONS = this.globalProv.getJSONLocalStorage(GlobalProvider.NOTIFICACIONES_LOCAL);
    alert.addInput({
      type: 'checkbox',
      label: 'Ordenes',
      checked: this.globalProv.getJSONLocalStorage(GlobalProvider.NOTIFICACIONES_LOCAL).Ordenes,
      handler: () => {
        NOTIFICATIONS.Ordenes = !NOTIFICATIONS.Ordenes
      }
      });
    alert.addInput({
      type: 'checkbox',
      label: 'Promociones',
      checked: this.globalProv.getJSONLocalStorage(GlobalProvider.NOTIFICACIONES_LOCAL).Promociones,
      handler: () => {
        NOTIFICATIONS.Promociones = !NOTIFICATIONS.Promociones
      }
      });
    alert.addInput({
      type: 'checkbox',
      label: 'Notificaciones',
      checked: this.globalProv.getJSONLocalStorage(GlobalProvider.NOTIFICACIONES_LOCAL).Notificaciones,
      handler: () => {
        NOTIFICATIONS.Notificaciones = !NOTIFICATIONS.Notificaciones
      }
      });
    alert.addButton({
      text: 'Listo',
      handler: () => {
        localStorage.setItem(GlobalProvider.NOTIFICACIONES_LOCAL,JSON.stringify(NOTIFICATIONS));
      }
    });
    alert.present();
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
