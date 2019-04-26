import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-action-category',
  templateUrl: 'action-category.html',
})
export class ActionCategoryPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActionCategoryPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
