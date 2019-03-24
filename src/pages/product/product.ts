import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  currentNumber = 0;

  variantId:any;

  isCart:any;
  isFavorite:any;

  detail: string = 'description';

  product: any;

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
              public navParams: NavParams,
              public globalProv: GlobalProvider) {

    this.product = this.navParams.data;

    this.currentNumber = 1;

    this.variantId = this.product.variante;

    this.isCart = this.globalProv.isElementLocalStorageById(GlobalProvider.CART_LOCAL, this.product.id);
    this.isFavorite = this.globalProv.isElementLocalStorageById(GlobalProvider.FAVORITE_LOCAL, this.product.id);

    /**
     * Nombre de la Página
     */
    this.namePage = {
      name: 'product'
    };
  }

  addCart(){
    this.globalProv.addElementToJSONOfLocalStorage(GlobalProvider.CART_LOCAL, this.product);
    this.globalProv.showToast("Agregado al carrito", "middle").present();
    this.isCart = true;
  }

  removeCart(){
    this.globalProv.removeElementToJSONOfLocalStorageById(GlobalProvider.CART_LOCAL, this.product.id);
    this.globalProv.showToast("Removido del carrito", "middle").present();
    this.isCart = false;
  }

  addFavorite(){
    this.globalProv.addElementToJSONOfLocalStorage(GlobalProvider.FAVORITE_LOCAL, this.product);
    this.globalProv.showToast("Agregado a favoritos", "middle").present();
    this.isFavorite = true;
  }

  removeFavorite(){
    this.globalProv.removeElementToJSONOfLocalStorageById(GlobalProvider.FAVORITE_LOCAL, this.product.id);
    this.globalProv.showToast("Removido de favoritos", "middle").present();
    this.isFavorite = false;
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

  checkS(){
    this.s = true;
    this.m = false;
    this.l = false;
  }

  checkM(){
    this.s = false;
    this.m = true;
    this.l = false;
  }

  checkL(){
    this.s = false;
    this.m = false;
    this.l = true;
  }

  addToFavorite(){
  }
}
