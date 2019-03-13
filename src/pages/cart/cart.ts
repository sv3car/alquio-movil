import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cart: string = null;
  namePage: any;
  totalQty : number = 0;
  totalPrice : number = 0;

  cartProd : any[] = [
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
  ]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public global: GlobalProvider) {
    console.log("cart");
    this.namePage = {
      name: 'cart'
    };

    if (this.global.cartExchage()){
      this.cart = "El Carrito esta vacío"
    }else {
      let products: any[] = JSON.parse(localStorage.getItem("product_cart"));
      this.chargeTotal();
    }
  }

  chargeTotal(){
    this.totalQty = 0;
    this.totalPrice = 0;
    for(let prod of this.cartProd){
      this.totalQty = this.totalQty + Number(prod.quantity);
      this.totalPrice = this.totalPrice + (Number(prod.Precio) * Number(prod.quantity));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  increment(cartProd):void {
    cartProd.quantity++;
    this.chargeTotal();
  }
  
  decrement(cartProd):void {
    if (cartProd.quantity > 0) { 
      cartProd.quantity--;
      this.chargeTotal();
    }
  }

  goStart(){
    console.log(this.cartProd);
  }

  backPage():void{
    this.navCtrl.pop();
  }

}
