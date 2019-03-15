import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, ModalController} from 'ionic-angular';


//Providers
import { RestProvider } from '../../providers/rest/rest';

//Pages
import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})

export class StartPage {

  categoryNumber: number = 1;

  globalDrawer: boolean;

  drawerOptions: any;

  namePage: any;

  nextPage: string;

  categ : any[] = [];

  pagesProd : any[] = [];
  
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
              public restProvider: RestProvider) {

    this.drawerOptions = {
      handleWidth: 17.25,
      type: '%'
    };

    this.namePage = {
      name: 'start'
    };
    let user : any = JSON.parse(localStorage.getItem("user"));
    console.log(user);
  }

  ionViewDidLoad() {
    this.getCategories();
    this.getPageProducts(this.categoryNumber);
  }

  getCategories() {
    this.restProvider.getData("categorias", "?api_token="+localStorage.getItem('token'))
     .then((data:any) => {
      this.categ = data;
    });
  }

  getPageProducts(categoryNumber:number) {
    /*this.restProvider.getData("categorias", "?api_token="+localStorage.getItem('token'))
     .then(data => {
      this.categ = data;
    });*/

    this.restProvider.getData("productos", "?api_token="+localStorage.getItem('token') + 
    "&categoria_id=" + categoryNumber)
    .then((data)=>{
      console.log("PRODUCTOS SUCCESS", data);
      
      this.pagesProd.push(data);
        for(let page of this.pagesProd){
          for (let prod of page.data){
            this.products.push(prod);
          }
          this.nextPage = page.next_page_url;
        }
        this.next();

    },(err)=>{
      console.log("PRODUCTOS ERROR", err);
    })


  }

  getAllProducts() {
    // this.restProvider.get(localStorage.getItem("token"), 'productos')
    // .then(data => {
    //   this.pagesProd.push(data);
    //   for(let page of this.pagesProd){
    //     for (let prod of page.data){
    //       this.products.push(prod);
    //     }
    //     this.nextPage = page.next_page_url;
    //   }
    //   this.next();
    // });

    this.restProvider.getData("productos", "?api_token="+localStorage.getItem('token'))
    .then((data)=>{
      console.log("PRODUCTOS SUCCESS", data);
      
      this.pagesProd.push(data);
        for(let page of this.pagesProd){
          for (let prod of page.data){
            this.products.push(prod);
          }
          this.nextPage = page.next_page_url;
        }
        this.next();

    },(err)=>{
      console.log("PRODUCTOS ERROR", err);
    })
  }

  next(infiniteScroll?) {
    if (infiniteScroll) {
      this.restProvider.getDataUrl(this.nextPage)
        .then(data => {
          this.pagesProd.push(data);
          let pageCuerrent : any[] = [];
          pageCuerrent.push(data);
          for(let page of pageCuerrent){
            for (let prod of page.data){
              this.products.push(prod);
            }
            this.nextPage = page.next_page_url;
          }
          infiniteScroll.complete();
      });
    }
  }
 
  loadMore(infiniteScroll) {
    this.next(infiniteScroll);
    if (this.nextPage === null) {
      infiniteScroll.enable(false);
    }
  }

  goProduct(product){   
    this.navCtrl.push(ProductPage, product);
  };

  moveLeft(index: number): void {
    if (this.categoryNumber > 1){
      this.products = [];
      this.pagesProd = [];
      this.categoryNumber--;
      this.getPageProducts(this.categoryNumber);
    }
    this.slidesList.toArray()[index].slidePrev(500);
  }   

  moveRight(index: number): void {
    
    /*let numCategCuerrnt : number = 0;
    for(let cat = 0NumberFormatStyle to this.categ.length){
      numCategCuerrnt++;
    }*/
    if (this.categoryNumber < 7){
      this.products = [];
      this.pagesProd = [];
      this.categoryNumber++;
      this.getPageProducts(this.categoryNumber);
    }
    this.slidesList.toArray()[index].slideNext(500);
  } 

  /*showCategories():void{
    let modal = this.modalCtrl.create(ActionCategoryPage);
    modal.present();
  }*/

  ngAfterViewInit() {
    /*this.startService.change.subscribe(serviDisplay => {
        this.changeContent(serviDisplay);
        })*/
  }

  backPage():void{
    //this.startService.toggle(false);
    localStorage.setItem("token", null);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
