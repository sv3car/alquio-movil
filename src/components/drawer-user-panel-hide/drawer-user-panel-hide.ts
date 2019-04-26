import { Component, ElementRef} from '@angular/core';
import { DrawerUserService } from '../drawer-user/drawer-user-service';

@Component({
  selector: 'drawer-user-panel-hide',
  templateUrl: 'drawer-user-panel-hide.html'
})
export class DrawerUserPanelHide {

  text: string;

  constructor(public element: ElementRef,
              public drUserService: DrawerUserService) {
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });
  }

  handlePan(ev){
    if(ev.additionalEvent === "panup"){
      this.hideDrawerUser();
    }
  }

  hideDrawerUser():void{
    this.drUserService.toggle(false);
  }

}
