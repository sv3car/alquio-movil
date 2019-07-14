import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'page-preguntas',
  templateUrl: 'preguntas.html'
})
export class PreguntasPage {
  
  namePage : any;
  preguntas : string [];
  q : boolean [] = [];

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public globalProv : GlobalProvider,
            public modalCtrl: ModalController,
            private sanitizer: DomSanitizer) {
    /**
     * Nombre de la Página
     */
    
    this.preguntas = [
      "Envío y entrega",
      "Devoluciones y reembolsos",
      "Pagos, precios y promociones",
      "Administrando su cuenta"
    ];
    for (let j in this.preguntas){
      this.q[j] = false;
    }
    this.namePage = {
      name: 'Ayuda'
    };
  }

  muestra(i){
    this.q[i]=!this.q[i];
  }

  preguntaURL(i){
    return this.sanitizer.bypassSecurityTrustResourceUrl("assets/text-files/pregunta"+(i+1)+".html");
  }

  backPage(){

    this.navCtrl.pop();

  }

}
