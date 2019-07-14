import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { PreguntasPage } from '../preguntas/preguntas';
import { TerminosyCondicionesPage } from '../terminosycondiciones/terminosycondiciones';

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html'
})
export class AyudaPage {
  
  namePage : any;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public globalProv : GlobalProvider,
            public modalCtrl: ModalController) {
    /**
     * Nombre de la Página
     */

    this.namePage = {
      name: 'Ayuda'
    };
  }

  gotoTerminosycondiciones(){
    let terminos = this.modalCtrl.create(TerminosyCondicionesPage, {}, {cssClass: 'legalinformation'});
    terminos.present();
  }

  gotoPreguntasfrecuentes(){
    this.navCtrl.push(PreguntasPage);
  }

  gotoAcercade(){
    let about = this.modalCtrl.create(AboutPage, {}, {cssClass: 'about'});
    about.present();
  }

  gotoContacto(){
    let contacto = this.modalCtrl.create(ContactPage, {}, {cssClass: 'contact'});
    contacto.present();
  }

  backPage(){

    this.navCtrl.pop();

  }

}
