import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Providers

import { GlobalProvider } from '../../providers/global/global';


//Pages

import { OrdenesPage  } from '../../pages/ordenes/ordenes';
import { ProductPage } from '../product/product';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  namePage: any;
  totalQty : number = 0;
  totalPrice : number = 0;
  cartProd : any[] = []

  /*cartProd : any[] = [
    {
      foto : "prod1-slide1.jpg",
      Name : "Audifonos Inteligentes",
      Description : "",
      Tipo_de_envio : "Envio Gratis",
      Precio: "60",
      quantity: 1
    },
    {
      foto : "producto-2.png",
      Name : "Reloj Inteligente",
      Description : "",
      Tipo_de_envio : "Envio Gratis",
      Precio: "100",
      quantity: 1
    },
    {
      foto : "producto-2.png",
      Name : "Reloj Inteligente",
      Description : "",
      Tipo_de_envio : "Envio Gratis",
      Precio: "100",
      quantity: 1
    },
    {
      foto : "producto-2.png",
      Name : "Reloj Inteligente",
      Description : "",
      Tipo_de_envio : "Envio Gratis",
      Precio: "100",
      quantity: 1
    },
    {
      foto : "producto-2.png",
      Name : "Reloj Inteligente",
      Description : "",
      Tipo_de_envio : "Envio Gratis",
      Precio: "100",
      quantity: 1
    }
  ]*/

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public globalProv: GlobalProvider,) {       
    /**
     * Nombre de la Página
     */
    
    this.cartProd = this.globalProv.getJSONLocalStorage(GlobalProvider.CART_LOCAL);

    this.namePage = {
      name: 'cart'
    };
  }

  chargeTotal(){
    this.totalQty = 0;
    this.totalPrice = 0;
    for(let prod of this.cartProd){
      this.totalQty = this.totalQty + Number(prod.cantidad);
      this.totalPrice = this.totalPrice + (Number(prod.precio) * Number(prod.cantidad));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  increment(prod):void {
    prod.cantidad++;
    this.chargeTotal();
  }
  
  decrement(prod):void {
    if (prod.cantidad > 1) { 
      prod.cantidad--;
      this.chargeTotal();
    }
  }

  goStart(){
    console.log(this.cartProd);
  }

  backPage():void{
    this.navCtrl.pop();
  }


  /**
   * 
   * Metodo que navega a la pantalla ordenes
   * 
   */
  nav(){

    this.navCtrl.push(OrdenesPage);

  }

  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

}
