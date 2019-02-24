import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'drawer-product-detail-panel',
  templateUrl: 'drawer-product-detail-panel.html'
})
export class DrawerProductDetailPanel {

  text: string;

  constructor(public element: ElementRef) {
  }

  @HostListener('click')
  click() {
    this.showDetail();
  }

  ngAfterViewInit() {
    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });
    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

  }

  handlePan(ev){
    if(ev.additionalEvent === "pandown"){
      this.showDetail();
    }
  }

  showDetail():void{
    //this.drUserService.toggle(true);
  }

}
