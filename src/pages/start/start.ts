import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, ModalController} from 'ionic-angular';


//Providers
import { RestProvider } from '../../providers/rest/rest';

//Pages
import { ProductPage } from '../product/product';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {

  namePage: any;

  tutorial: boolean;

  loading: any;

  categoryIndex: number = 0;

  categoryId: number;
  
  nextPage: string;

  categories : any[] = [];
  
  products : any[] = [];

  productsPar : any[] = []
  
  productsImpar : any[] = []


  //ANIMACION FILTER 
  initialPosition: boolean = true;
  leftPosition: boolean = false;
  initialColor: boolean = true;
  leftColor: boolean = false;
  initialButton: boolean = true;
  leftButton: boolean = false;
  //

  @ViewChildren(Slides) slidesList: QueryList<Slides>;

  slides = [
    {
      image: "slider1.jpg",
    },
    {
      image: "slider2.jpg",
    },
    {
      image: "slider3.jpg",
    }
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public restProvider: RestProvider,
              public globalProv: GlobalProvider) {
    /**
     * Nombre de la Página
     */
    this.namePage = {
      name: 'start'
    };
  }

  ionViewDidLoad() {
    this.tutorial = true//this.globalProv.isTutorial();
    this.getCategoriesAndProducts(this.categoryIndex);
  }

  dismissTut(){
    this.tutorial = false;
  }

  /**
   * Médotodo los productos segun la categoría seleccionada
   * en el template
   * 
   * @param index índice de la categoría en el array
   * @param id id de la categoría en el array (opcional)
   */
  getCategoriesAndProducts(index:number, id?:number) {
    this.loading = this.globalProv.crearLoading();
    this.loading.present();
    this.restProvider.getData("categorias", "?api_token="+localStorage.getItem('token'))
    .then((data:any) => {
      console.log(data);
      this.categories = data;
      let currentId: number;
      if (!id){
        currentId = this.globalProv.getArrayIdByIndex(data, index);
      } else {
        currentId = id;
      }
      this.categoryIndex = this.globalProv.getArrayIndexById(data, currentId);
      this.getPageProducts(currentId);
    });
  }

  /**
   * Método que odena los productos para que se visualicen de forma correcta
   * en el gred asimétrico
   * 
   * @param products array de productos a ordenar
   */
  getReorderProducts(products:any):any{
    let indexProd = 0;
    for (let prod of products){
      let tipo = (indexProd % 2)==0 ? true : false;
      if (tipo){
        this.productsPar.push(prod);
      }else{
        this.productsImpar.push(prod);
      }
      indexProd = indexProd + 1;
    }
    /*let productsAux = productsPar;
    for (let prodImp of productsImpar){
      productsAux.push(prodImp);
    }*/
    //return productsAux
  }

  /**
   * Método que carga los productos segun un id de categoría
   * 
   * @param categoryId id de categoría
   */
  getPageProducts(categoryId:number) {
    this.nextPage = null;
    this.products = [];
    this.categoryId = categoryId;
    this.restProvider.getData("productos", "?api_token="+localStorage.getItem('token') + 
    "&categoria_id=" + categoryId)
    .then((data:any)=>{
        this.products = data.data;
        this.productsImpar = [];
        this.productsPar = [];
        this.slidesList.toArray()[1].slideTo(this.categoryIndex, 500);
        this.getReorderProducts(this.products);
        this.nextPage = data.next_page_url;
        this.next();
        this.loading.dismiss();
    },(err)=>{
      this.loading.dismiss();
      console.log("PRODUCTOS ERROR", err);
    })
  }

  /**
   * Método que determina si se añadiran o no mas 
   * artículos a la página
   * 
   * @param infiniteScroll 
   */
  next(infiniteScroll?) {
    if (infiniteScroll && this.nextPage) {
      let arrayNextPage = this.nextPage.split("=");
      let numberPage = arrayNextPage[arrayNextPage.length-1];
      this.restProvider.getData("productos", "?api_token="+localStorage.getItem('token')+"&categoria_id="+this.categoryId+"&page%5Bnumber%5D="+numberPage)
      .then((data:any) => {
          /*let productsAux : any[] = this.getReorderProducts(data.data);

          let middleNewProducts : number = productsAux.length/2;
          let positionCurrent : number = 1;
          let quantityTotalsProducts : number = this.products.length;
          let positionAddLeft : number = (quantityTotalsProducts/2) - 1;

          for (let product of productsAux){
            if (positionCurrent===middleNewProducts){
              let positionAddRight = (this.products.length) - 1;
              this.products.splice(positionAddRight, 0, product);
            } else {
              this.products.splice(positionAddLeft++, 0, product);
              positionCurrent++;
            }
          }*/

          let nextProducts : any[] = data.data

          for(let product of nextProducts){
            this.products.push(product);
          }

          this.getReorderProducts(nextProducts);
          this.nextPage = data.next_page_url;
          infiniteScroll.complete();
      })
      .catch((err)=>{
        console.log("CATCH ERROR DATA URL",err);
      });
    }
  }
 
  /**
   * Método que se llama desde el template para 
   * el scroll infinito
   * 
   * @param infiniteScroll 
   */
  loadMore(infiniteScroll) {
    this.next(infiniteScroll);
    if (this.nextPage === null) {
      infiniteScroll.enable(false);
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

  moveRight(): void {
    if (this.categoryIndex < this.categories.length - 1){
      this.getCategoriesAndProducts(++this.categoryIndex);
    }
  } 

  moveLeft(): void {
    if (this.categoryIndex > 0){
      this.getCategoriesAndProducts(--this.categoryIndex);
    }
  }   

  /**
   * 
   * Metodo para mostrar u ocultar el filter
   * 
   */
  filterTransition(){

    this.initialPosition = !this.initialPosition;
    this.leftPosition = !this.leftPosition;
    this.initialColor = !this.initialColor;
    this.leftColor = !this.leftColor;
    this.initialButton = !this.initialButton;
    this.leftButton = !this.leftButton;

  }

  /**
   * 
   * Metodo para mostrar u ocultar el filter con un gesture swipe
   * 
   */
  filterTransitionWithGesture(event){

    

    switch(event.direction){

      case 2:
        console.log("izquierda");
        this.initialPosition = false;
        this.leftPosition = true;
        this.initialColor = false;
        this.leftColor = true;
        this.initialButton = false;
        this.leftButton = true;
      break;
      case 4:
        console.log("derecha");
        this.initialPosition = true;
        this.leftPosition = false;
        this.initialColor = true;
        this.leftColor = false;
        this.initialButton = true;
        this.leftButton = false;
      break;

    }

    // this.initialPosition = !this.initialPosition;
    // this.leftPosition = !this.leftPosition;
    // this.initialColor = !this.initialColor;
    // this.leftColor = !this.leftColor;
    // this.initialButton = !this.initialButton;
    // this.leftButton = !this.leftButton;

  }

  /**
   * 
   */
  /*backPage():void{
    localStorage.setItem("token", null);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }*/

  restarSlides(){
    this.slidesList.toArray()[0].startAutoplay();
  }

}
