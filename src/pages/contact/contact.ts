import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contact : FormGroup;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public formb: FormBuilder) {
          this.contact = this.formb.group({
            nombre: [''],
            correo: ['',[Validators.required,Validators.email]],
            mensaje: ['',Validators.required]
          });
  }

  contactar(){
    console.log(this.contact);
  }

}
