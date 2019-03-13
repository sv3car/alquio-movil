import { Component } from '@angular/core';

@Component({
  selector: 'bottom-app',
  templateUrl: 'bottom-app.html'
})
export class BottomComponent {

  text: string;

  constructor() {
    console.log('Hello BottomComponent Component');
    this.text = 'Hello World';
  }

}
