import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StartPage } from '../pages/start/start';
import { SingInPage } from '../pages/sing-in/sing-in';
import { ModalPruebaPage } from '../pages/modal-prueba/modal-prueba';
import { ActionCategoryPage } from '../pages/action-category/action-category';
import { DrawerFilter } from '../components/drawer-filter/drawer-filter';
import { DrawerCategoryPanel } from '../components/drawer-category-panel/drawer-category-panel';
import { StartService } from '../pages/start/start-service';
import { DrawerCategoryService } from '../components/drawer-category/drawer-category-service';
import { DrawerCategory } from '../components/drawer-category/drawer-category';
import { DrawerUser } from '../components/drawer-user/drawer-user';
import { DrawerUserPanel } from '../components/drawer-user-panel/drawer-user-panel';
import { DrawerUserService } from '../components/drawer-user/drawer-user-service';
import { OrderPage } from '../pages/order/order';
import { OrdertService } from '../pages/order/order-service';
import { DrawerCategoryPanelHide } from '../components/drawer-category-panel-hide/drawer-category-panel-hide';
import { DrawerUserPanelHide } from '../components/drawer-user-panel-hide/drawer-user-panel-hide';
import { ProductPage } from '../pages/product/product';
import { DrawerOpacity } from '../components/drawer-opacity/drawer-opacity';
import { DrawerSearch } from '../components/drawer-search/drawer-search';
import { DrawerProductDetailPanel } from '../components/drawer-product-detail-panel/drawer-product-detail-panel';
import { UserDetailPage } from '../pages/user-detail/user-detail';
import { HeaderComponent } from '../components/header-app/header-app';
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from '@angular/common/http';
import { JivoChatPage } from '../pages/jivo-chat/jivo-chat';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SingInPage,
    StartPage,
    OrderPage,
    ProductPage,
    JivoChatPage,
    ActionCategoryPage,
    ModalPruebaPage,
    UserDetailPage,
    HeaderComponent,
    DrawerFilter,
    DrawerCategory,
    DrawerCategoryPanel,
    DrawerCategoryPanelHide,
    DrawerUser,
    DrawerUserPanel,
    DrawerUserPanelHide,
    DrawerSearch,
    DrawerOpacity,
    DrawerProductDetailPanel
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    SingInPage,
    StartPage,
    OrderPage,
    JivoChatPage,
    ProductPage,
    ActionCategoryPage,
    ModalPruebaPage,
    UserDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StartService,
    OrdertService,
    DrawerCategoryService,
    DrawerUserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
