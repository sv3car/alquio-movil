import { Component } from '@angular/core';

@Component({
  selector: 'page-califica',
  templateUrl: 'califica.html',
})
export class CalificaPage {

  constructor() {
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
}

}
