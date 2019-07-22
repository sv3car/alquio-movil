import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CreditCardPage } from '../credit-card/credit-card';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import {Md5} from 'ts-md5/dist/md5';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  paymethod;
  medio_cd;
  order: any;

  //Nombre de la pagina
  namePage: any = {
                    name: 'ordenes'
                  };

  //
  showSummary: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public formb: FormBuilder,
              public alertCtrl: AlertController,
              public iab: InAppBrowser) {
      this.order = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesPage');
    console.log(this.createForm().value);
  }

  getOrder(){
    
  }

  makeSignature(orderid : string, amount : string) : string{
    return String(Md5.hashStr(GlobalProvider.API_KEY_PAYU+'~'+GlobalProvider.MERCHANT_ID_PAYU+'~'+orderid+'~'+amount+'~'+GlobalProvider.CURRENCY))
  }

  createForm() {
    let form : any = {
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: {
         apiKey: GlobalProvider.API_KEY_PAYU,
         apiLogin: GlobalProvider.API_LOGIN_PAYU
      },
      transaction:{
        order: {
          accountId: GlobalProvider.ACCOUNT_ID,
          referenceCode: String(this.order.id),
          description: "Pago de orden No."+String(this.order.id),
          language: "es",
          signature: this.makeSignature(String(this.order.id),String(this.order.monto)),
          additionalValues: {
             TX_VALUE: {
                value: this.order.monto,
                currency: GlobalProvider.CURRENCY
              },
             TX_TAX: {
                value: this.order.monto*0.16,
                currency: GlobalProvider.CURRENCY
              },
             TX_TAX_RETURN_BASE: {
                value: this.order.monto*0.84,
                currency: GlobalProvider.CURRENCY
              }
          },
          buyer:{
            emailAddress: JSON.parse(localStorage.getItem(GlobalProvider.USER_LOCAL)).email
          }
        },
        type: "AUTHORIZATION_AND_CAPTURE",
        paymentMethod: "VISA",
        paymentCountry: "CO",
        ipAddress: "127.0.0.1"
      },
      test: "false"
    };

    return this.formb.group(form);
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

  ordenar(){
     var pageContent = '<html> ' +
      '<head>' +
      '</head>' +
      '<body>' +
              '<form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" id="payForm">' +
                  '<input name="merchantId"    type="hidden"  value="508029"   >' +
                  '<input name="accountId"     type="hidden"  value="512321" >' +
                  '<input name="description"   type="hidden"  value="Test PAYU"  >' +
                  '<input name="referenceCode" type="hidden"  value="TestPayU" >' +
                  '<input name="amount"        type="hidden"  value="20000"   >' +
                  '<input name="tax"           type="hidden"  value="3193"  >' +
                  '<input name="taxReturnBase" type="hidden"  value="16806" >' +
                  '<input name="currency"      type="hidden"  value="COP" >' +
                  '<input name="signature"     type="hidden"  value="7ee7cf808ce6a39b17481c54f2c57acc"  >' +
                  '<input name="test"          type="hidden"  value="1" >' +
                  '<input name="buyerEmail"    type="hidden"  value="test@test.com" >' +
                  '<input name="responseUrl"    type="hidden"  value="http://www.test.com/response" >' +
                  '<input name="confirmationUrl"    type="hidden"  value="http://www.test.com/confirmation" >' +
                '</form>' + 
          '<script type="text/javascript">document.getElementById("payForm").submit();</script>' +
      '</body>' +
      '</html>';
      
      var pageContentURL = 'data:text/html;base64,' + btoa(pageContent);


      const browser = this.iab.create(pageContentURL, "_blank", "hidden=no,location=yes,clearsessioncache=yes,clearcache=yes,beforeload=get");
      browser.on("beforeload").subscribe(event => {
        if (event.url.startsWith("http://www.test.com/")){
          let URL = event.url.substring(0);
          browser.close();
          this.alertCtrl.create({
            title: "Para bolas carlos",
            message: URL
          }).present(); 
        }
      });



      // browser.executeScript(...);
      
      // browser.insertCSS(...);
      // browser.on('loadstop').subscribe(event => {
      //     browser.insertCSS({ code: "body{color: red;" });
      // });

      //browser.close();

      // console.log(this.paymethod);
      // if (this.paymethod == "rad_cd" && this.medio_cd){
      //   let modal = this.modalCtrl.create(CreditCardPage,this.createForm());
      //   modal.present();
      // } else if (this.paymethod == "rad_cash"){

      // } else if (this.paymethod == "rad_bank"){

      // } else{
      //   this.alertCtrl.create({
      //     title: "Espera!",
      //     message: "Debes seleccionar un método de pago primero para proceder con la orden."
      //   }).present();
      // }
  }

}
