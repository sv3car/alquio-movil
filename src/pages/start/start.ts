import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, ModalController} from 'ionic-angular';


//Providers
import { RestProvider } from '../../providers/rest/rest';

//Pages
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {

  namePage: any;

  loading: any;

  categoryIndex: number = 0;

  categoryId: number;
  
  nextPage: string;

  categories : any[] = [];
  
  products : any[] = [];

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
    this.getCategoriesAndProducts(this.categoryIndex);
  }

  /**
   * Método que retorna el id de un
   * elemento de un array segun su indice
   * 
   * @param array 
   * @param indexCat 
   */
  getArrayIdByIndex(array:any, index:number):number{
    return array.find((element:any, ind: number) => {
      return ind == index;
    }).id;
  }

  /**
   * Método que retorna el índice de un
   * elemento de un array segun su id
   * 
   * @param array 
   * @param id 
   */
  getArrayIndexById(array:any, id:number):number{
    return array.findIndex((element:any) => {
      return element.id == id;
    });
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
    this.restProvider.getTestServices("categorias", "?api_token="+localStorage.getItem('token'))
    .then((data:any) => {
      this.categories = data;
      let currentId: number;
      if (!id){
        currentId = this.getArrayIdByIndex(data, index);
      } else {
        currentId = id;
      }
      this.slidesList.toArray()[1].slideTo(this.getArrayIndexById(data, currentId), 500);
      this.getPageProducts(currentId);
    });
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
    this.restProvider.getTestServices("productos", "?api_token="+localStorage.getItem('token') + 
    "&categoria_id=" + categoryId)
    .then((data:any)=>{
        this.products = data.data;
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
      this.restProvider.getTestServices("productos", "?api_token="+localStorage.getItem('token')+"&categoria_id="+this.categoryId+"&page%5Bnumber%5D="+numberPage)
      .then((data:any) => {
          for(let product of data.data){
            this.products.push(product);
          }
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

  ngAfterViewInit() {
  }

  /**
   * 
   */
  backPage():void{
    localStorage.setItem("token", null);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
