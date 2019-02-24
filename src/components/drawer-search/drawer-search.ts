import { Component } from '@angular/core';

/**
 * Generated class for the DrawerSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drawer-search',
  templateUrl: 'drawer-search.html'
})
export class DrawerSearch {

  text: string;

  constructor() {
    console.log('Hello DrawerSearchComponent Component');
    this.text = 'Hello World';
  }

}
