import { Component, ViewChild } from '@angular/core';
import { ViewController, Searchbar, NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProductPage } from '../product/product';

//Providers

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  inSearch : boolean = false;

  items : any[] = [];

  @ViewChild('searchBar') searchBar:Searchbar;

  constructor(public viewCtrl: ViewController,
              public restProvider: RestProvider,
              public navCtrl: NavController) {
  }

  ionViewDidLoad() {

    setTimeout(() => {
      this.searchBar.setFocus();
    },600);

    console.log('ionViewDidLoad Search');
  }

  getItems(ev) {
    this.inSearch = !this.inSearch
    // set val to the value of the ev target
    var val = ev.target.value;

    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      
      this.restProvider.getData('productos', "?api_token="+localStorage.getItem('token') + 
      "&name=" + val)
      .then((data:any)=>{
        this.items = data.data;
        this.inSearch = !this.inSearch
      },(err)=>{
        console.log("PRODUCTOS ERROR", err);
      })

    } else {
      this.items = [];
      this.inSearch = !this.inSearch
    }
  }

  /**
   * Redirecciona a la página de Productos
   * 
   * @param product pasa como parametro el producto seleccionado
   */
  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
