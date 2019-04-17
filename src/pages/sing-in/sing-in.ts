import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//Providers
import { GlobalProvider } from '../../providers/global/global';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the SingInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sing-in',
  templateUrl: 'sing-in.html',
})
export class SingInPage {

  frmRegister: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public frmBuilder: FormBuilder,
              public globalProv: GlobalProvider,
              public restProv: RestProvider) {


      this.frmRegister = this.crearFormulario();

  }


  /**
   * 
   * Metodo que crea un formulario
   * 
   */
  crearFormulario(){

    return this.frmBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

  }


  /**
   * 
   * Metodo que registra un usuario
   * 
   */
  registrarUsuario(){

    let loading = this.globalProv.crearLoading();
    loading.present();

    let params = {
      name: this.frmRegister.value.name,
      email: this.frmRegister.value.email,
      password: this.frmRegister.value.password
    };

    this.restProv.postData("register", params)
    .then((data)=>{
      console.log("DATA REGISTER: ",data);
      let alert = this.globalProv.crearAlert("Éxito", 
                                               "Se ha registrado el usuario de forma exitosa.");

      

      loading.dismiss();
      alert.present();
      alert.onDidDismiss(()=>{
        this.navCtrl.pop();
      });
      
    })
    .catch((err)=>{
      console.log("ERROR REGISTER: ",err);
      let alert = this.globalProv.crearAlert("Error", 
                                               "No se pudo registrar el usuario.");

      loading.dismiss();
      alert.present();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingInPage');
  }

  goBack():void{
    this.navCtrl.pop();
  }

}
