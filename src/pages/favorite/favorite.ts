import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { ProductPage } from '../product/product';


@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  favoriteProd : any[] = [];
  namePage : any;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            public globalProv : GlobalProvider) {

    /**
     * Nombre de la Página
     */
    
    this.favoriteProd = this.globalProv.getJSONLocalStorage(GlobalProvider.FAVORITE_LOCAL);

    this.namePage = {
      name: 'favorite'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

  backPage():void{
    this.navCtrl.pop();
  }

}
