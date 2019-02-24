import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPruebaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-prueba',
  templateUrl: 'modal-prueba.html',
})
export class ModalPruebaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPruebaPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
