import { Component, Renderer, ElementRef, Input } from '@angular/core';
import { DomController, Platform, NavController, ModalController } from 'ionic-angular';
import { DrawerUserService } from './drawer-user-service';
import { DrawerOpacity } from '../drawer-opacity/drawer-opacity';

//Pages
import { OrderPage } from '../../pages/order/order';
import { CometChatPage } from '../../pages/comet-chat/comet-chat';
import { ConfigPage } from '../../pages/config/config';
import { FavoritePage } from '../../pages/favorite/favorite';
import { AboutPage } from '../../pages/about/about';

//providers
import { GlobalProvider } from '../../providers/global/global';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'drawer-user',
  templateUrl: 'drawer-user.html'
})
export class DrawerUser {

  @Input('options') options: any;
  @Input('sideBar') sideBar: DrawerOpacity;

  name: string = 'none';

  userImg: string = 'user-2.jpg';

  user_name: string;

  constructor(public domCtrl: DomController,
    public renderer: Renderer,
    public element: ElementRef,
    public platform: Platform,
    public drUserService: DrawerUserService,
    public navCtrl: NavController,
    public global: GlobalProvider,
    public rest: RestProvider,
    public modalCtrl: ModalController) {

      let user: any[] = global.getJSONLocalStorage(JSON.parse(localStorage.getItem('user')));

      console.log('localStorage: '+user);

    this.rest.getData('user', "?api_token=" + localStorage.getItem('token')).then((data: any) => {
      this.user_name=data.name;
    });
    this.userImg = "user-2.jpg";
  }

  ngAfterViewInit() {

    if (this.options.name) {
      this.name = this.options.name;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
    this.content();
  }

  content(): void {
    this.drUserService.change.subscribe(serviDisplay => {
      if (serviDisplay) {
        this.showContent();
      } else {
        this.hideContent();
      }
    });
  }

  showContent(): void {
    this.sideBar.content(true, false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'bottom 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'bottom', '0px');
    });
  }

  hideContent(): void {
    this.sideBar.content(false, false);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'bottom 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'bottom', this.platform.height() + 'px');
    })
  }

  goOrder(): void {
    this.hideContent();
    if (!(this.name === 'order')) {
      this.navCtrl.push(OrderPage);
    }
  }

  goChat(): void {
    this.hideContent();
    if (!(this.name === 'chat')) {
      this.navCtrl.push(CometChatPage);
    }
  }

  goConfig(): void {
    this.hideContent();
    if (!(this.name === 'config')) {
      this.navCtrl.push(ConfigPage);
    }
  }

  goFavorite(): void {
    this.hideContent();
    if (!(this.name === 'favorite')) {
      this.navCtrl.push(FavoritePage);
    }
  }

  goAbout(): void {
    if (!(this.name === 'about')) {
      const modal = this.modalCtrl.create(AboutPage);
      modal.present();
      //this.navCtrl.push(AboutPage);
    }
  }

}
