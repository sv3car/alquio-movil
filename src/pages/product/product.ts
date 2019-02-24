import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StartService } from '../start/start-service';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  currentNumber = 0;

  product: any;

  namePage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public startService: StartService) {
    this.namePage = {
      name: 'product'
    };
    this.product = this.navParams.data;
    this.currentNumber = 1;
    console.log(this.product);
  }

  ionViewDidLoad() {
  }
  
  increment():void {
    this.currentNumber++;
  }
  
  decrement():void {
    if (this.currentNumber > 0) { 
      this.currentNumber--;
    }
  }

  backPage():void{
    this.startService.toggle(false);
    this.navCtrl.pop();
  }

}
