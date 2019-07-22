import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

//Providers

import { GlobalProvider } from '../../providers/global/global';


//Pages

import { OrdenesPage  } from '../../pages/ordenes/ordenes';
import { ProductPage } from '../product/product';
import { StartPage } from '../start/start';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  namePage: any;
  cartProd : any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public globalProv: GlobalProvider,
              public alertCtrl: AlertController) {       
    /**
     * Nombre de la Página
     */
    
    this.cartProd = this.globalProv.getJSONLocalStorage(GlobalProvider.CART_LOCAL);

    this.namePage = {
      name: 'cart'
    };
  }

  concatComma(element, value){
    if (element){
      element = element + "," + value
    } else{
      element = value
    }
    return element;
  }

  fabricateOrder():any{
    let order: any = {};
    let productos: any[] = [];
    let totalQty = 0;
    let totalPrice = 0;
    let user = this.globalProv.getJSONLocalStorage(GlobalProvider.CART_LOCAL);
    for(let prod of this.cartProd){
      order.sku_id = this.concatComma(order.sku_id, prod.id);
      order.sku_precio = this.concatComma(order.sku_precio, prod.precio);
      order.sku_cantidad = this.concatComma(order.sku_cantidad, prod.cantidad);
      order.sku_name = this.concatComma(order.sku_name, prod.titulo);
      productos.push(prod); 
      totalQty = totalQty + Number(prod.cantidad);
      totalPrice = totalPrice + (Number(prod.precio) * Number(prod.cantidad));
    }
    order.direccion = user.direccion;
    order.telefono = user.telefono_celular;
    order.monto = totalPrice;
    order.detalles = productos;
    console.log(order);
    return order;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    /*if (this.cartProd){
      this.chargeTotal();
    }*/
  }

  increment(prod):void {
    prod.cantidad++;
    //this.chargeTotal();
  }
  
  decrement(prod):void {
    if (prod.cantidad > 1) { 
      prod.cantidad--;
      //this.chargeTotal();
    }
  }

  goStart(){
    console.log(this.cartProd);
  }

  backPage():void{
    this.navCtrl.setRoot(StartPage);
  }


  /**
   * 
   * Metodo que navega a la pantalla ordenes
   * 
   */
  nav(){
    let carritovacioalert = this.alertCtrl.create();
    carritovacioalert.setTitle("Carrito vacío!");
    carritovacioalert.setMessage("Llena el carrito para poder realizar una orden de compra");
    if (this.cartProd){
      let order = this.fabricateOrder();
      this.navCtrl.push(OrdenesPage, order);
    } else {
      carritovacioalert.present();
    }
  }

  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

}
