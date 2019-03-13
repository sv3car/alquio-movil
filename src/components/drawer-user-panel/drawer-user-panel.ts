import { Component, ElementRef, HostListener } from '@angular/core';
import { DrawerUserService } from '../drawer-user/drawer-user-service';

//Providers
import { GlobalProvider } from '../../providers/global/global';

@Component({
  selector: 'drawer-user-panel',
  templateUrl: 'drawer-user-panel.html'
})
export class DrawerUserPanel {

  text: string;

  constructor(public element: ElementRef, 
              public drUserService: DrawerUserService,
              public globalProv: GlobalProvider) {
  }

  @HostListener('click')
  click() {
    this.showDrawerUser();
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }

  handlePan(ev){
    if(ev.additionalEvent === "pandown" /*&& !this.globalProv.getDrawer()*/){
      this.showDrawerUser();
    }
  }

  showDrawerUser():void{
    this.drUserService.toggle(true);
  }

}
