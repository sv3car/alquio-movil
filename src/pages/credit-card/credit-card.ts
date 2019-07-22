import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-credit-card',
  templateUrl: 'credit-card.html',
})
export class CreditCardPage {
  
  formacredito : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private formb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditCardPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  process(){
    
  }

}
