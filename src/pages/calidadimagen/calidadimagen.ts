import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-calidadimagen',
  templateUrl: 'calidadimagen.html',
})
export class CalidadImagen {
  modoelegido: string;
  modos: string [] = [];

  constructor(public navParams: NavParams,
              public global: GlobalProvider,
              public viewCtrl: ViewController) {
    this.modos = [
      "Calidad inteligente",
      "Calidad alta (Wi-Fi)",
      "Calidad normal (2G o 3G)"];
    this.modoelegido=this.global.imagqualitymode;
  }

  saveImagQuality(){
    this.global.imagqualitymode=this.modoelegido;
    this.viewCtrl.dismiss();
  }

  back(){
    this.viewCtrl.dismiss();
  }

}
