import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  currentNumber = 0;

  isVariant : boolean;

  detail: string = 'description';

  product: any;

  existCart : boolean;

  iconoFavoritos: string = "icon-color-false";
  iconoCarrito: string = "icon-color-false";
  iconoCompartir: string = "icon-color-false";

  s: boolean;
  m: boolean;
  l: boolean;

  color1: boolean;
  color2: boolean;
  color3: boolean;
  color4: boolean;
  color5: boolean;
  color6: boolean;

  namePage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams/*,
              public startService: StartService*/
              ,public global: GlobalProvider) {

    this.iconoFavoritos = "icon-color-false";
    this.iconoCarrito = "icon-color-false";
    this.iconoCompartir = "icon-color-false";

    //this.existCart = false;

    this.namePage = {
      name: 'product'
    };
    this.product = this.navParams.data;
    this.currentNumber = 1;

    if(this.product.variante == null){
      this.isVariant = false;
    } else {
      this.isVariant = true;
    }

    /*if(!this.global.cartExchage() && this.global.existProdCart(JSON.parse(localStorage.getItem("product_cart"))
    , this.product)){
      console.log("carrito llena");
      this.existCart = true;
    } else {
      console.log("carrito vacio");
      this.existCart = false;
    }*/
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
    //this.startService.toggle(false);
    this.navCtrl.pop();
  }

  updateColor(color: number){
    if (color == 1 && this.color1){
      this.color2=false;
      this.color3=false;
      this.color4=false;
      this.color5=false;
      this.color6=false;
    } else if (color == 2 && this.color2) {
      this.color1=false;
      this.color3=false;
      this.color4=false;
      this.color5=false;
      this.color6=false;
    } else if (color == 3 && this.color3) {
      this.color1=false;
      this.color2=false;
      this.color4=false;
      this.color5=false;
      this.color6=false;
    } else if (color == 4 && this.color4) {
      this.color1=false;
      this.color2=false;
      this.color3=false;
      this.color5=false;
      this.color6=false;
    } else if (color == 5 && this.color5) {
      this.color1=false;
      this.color2=false;
      this.color3=false;
      this.color4=false;
      this.color6=false;
    } else if (color == 6 && this.color6) {
      this.color1=false;
      this.color2=false;
      this.color3=false;
      this.color4=false;
      this.color5=false;
    }
  }

  updateSize(size: string){
    if (size == "s" && this.s){
      this.m = false;
      this.l = false;
    } else if (size == "m" && this.m) {
      this.s = false;
      this.l = false;
    } else if (size == "l" && this.l) {
      this.s = false;
      this.m = false;
    }
  }

  addToCart(){
    let product_cart : any[] = [] 
    if(this.global.cartExchage()){
      product_cart.push(this.product);
      localStorage.setItem('product_cart', JSON.stringify(product_cart));
      this.existCart = true;
    } else{
      product_cart = JSON.parse(localStorage.getItem("product_cart"));
      if (!this.global.existProdCart(product_cart, this.product)){
        product_cart.push(this.product);
        localStorage.setItem('product_cart', JSON.stringify(product_cart));
        this.existCart = true;
      } else{
        product_cart.splice(product_cart.indexOf(this.global.existProdCart(product_cart, this.product)), 1);
        this.existCart = false;
      }
    }
  }

  addToFavorite(){

  }

}
