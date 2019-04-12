import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

//Pages
import { SearchPage } from '../../pages/search/search';
import { CartPage } from '../../pages/cart/cart';

@Component({
  selector: 'header-app',
  templateUrl: 'header-app.html'
})
export class HeaderComponent {

  @Input('options') options: any;

  name : string;
  text: string;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {
  }

  ngAfterViewInit() {
    if(this.options.name){
      this.name = this.options.name;
    }
  }

  goCart(){
    if (!(this.name === 'cart')){
      this.navCtrl.push(CartPage);
    }
  }

  showSearch() {
    const modal = this.modalCtrl.create(SearchPage);
    modal.present();
  }

}
