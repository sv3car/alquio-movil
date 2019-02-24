import { Component, Input, ElementRef, Renderer } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';
import { DrawerOpacity } from '../drawer-opacity/drawer-opacity';

@Component({
  selector: 'drawer-filter',
  templateUrl: 'drawer-filter.html'
})
export class DrawerFilter {

  @Input('options') options: any;
  @Input('sideBar') sideBar: DrawerOpacity;

  handleWidth: number = 50;
  type: string = 'px';

  constructor(public element: ElementRef, public renderer: Renderer, 
    public domCtrl: DomController, public platform: Platform) {
  }

  ngAfterViewInit() {

    if(this.options.handleWidth){
      this.handleWidth = this.options.handleWidth;
    }

    if(this.options.type){
      this.type = this.options.type;
    }

    if (this.type === '%'){
      this.handleWidth = ((parseFloat(this.handleWidth.toString()) * 
      parseFloat(this.platform.width().toString()))/100);
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'left', 
    this.platform.width() - this.handleWidth + 'px');

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_HORIZONTAL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

  }

  handlePan(ev){

    if(ev.additionalEvent === "panright"){
      this.sideBar.content(false, true);
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'left 0.5s');

        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.platform.width() - 
        this.handleWidth + 'px');

      });
    }

    if(ev.additionalEvent === "panleft"){
      this.sideBar.content(true, true);
      this.domCtrl.write(() => {
        this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'left 0.5s');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', '0px');
      })
    }

  }

  hideFliter():void{

    this.sideBar.content(true, true);
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'left 0.5s');

      this.renderer.setElementStyle(this.element.nativeElement, 'left', this.platform.width() - 
      this.handleWidth + 'px');

    });
  }

}