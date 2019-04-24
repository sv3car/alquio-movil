import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CreditCardPage } from '../credit-card/credit-card';

/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  radcd: boolean = true;
  order: any;

  //Nombre de la pagina
  namePage: any = {
                    name: 'ordenes'
                  };

  //
  showSummary: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
      this.radcd = true;
      this.order = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesPage');
  }

  getOrder(){
    
  }

  /**
   * 
   * Metodo que regresa una pagina
   * 
   */
  backPage(){

    this.navCtrl.pop();

  }

  /**
   * 
   * Metodo que muestra el resumen
   * 
   */
  showSummaryAction(){
    this.showSummary = !this.showSummary;
  }

  paidCreditCard(){
      let modal = this.modalCtrl.create(CreditCardPage);
      modal.present();
  }

}
