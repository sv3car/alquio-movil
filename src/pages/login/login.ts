import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';


//Providers
import { RestProvider } from '../../providers/rest/rest';
import { GlobalProvider } from '../../providers/global/global';

//Pages
import { StartPage } from '../start/start';
import { SingInPage } from '../sing-in/sing-in';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  myForm: FormGroup;

  resp: any;

  FormLog = {
    email:"",
    password:""
  };

  constructor(public navCtrl: NavController,
              public restProvider: RestProvider,
              public globalProv: GlobalProvider,
              public fb: FormBuilder,
              public alertController: AlertController) {
      this.myForm = this.crearFormulario();
      this.setdefaultNotificacionesyCalidadimg();
  }

  /**
   * 
   * Metodo que retorna un nuevo FormGroup
   * 
   */
  crearFormulario(){

    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  setdefaultNotificacionesyCalidadimg(){
    if (!localStorage.getItem(GlobalProvider.NOTIFICACIONES_LOCAL)){
      localStorage.setItem(GlobalProvider.NOTIFICACIONES_LOCAL,JSON.stringify(GlobalProvider.NOTIFICATIONS));
    }
    if (!localStorage.getItem(GlobalProvider.CALIDADIMAGEN_LOCAL)){
      localStorage.setItem(GlobalProvider.CALIDADIMAGEN_LOCAL,JSON.stringify(GlobalProvider.CALIDADIMAGEN));
    }
  }


  /**
   * 
   * Metodo que hace login consumiendo el api
   * 
   */
  login() {

    let loading = this.globalProv.crearLoading();
    loading.present();

    this.restProvider.postData("login",this.myForm.value)
    .then((data:any)=>{
      console.log("LOGIN SUCCESS",data);
      if(data.Error){
        this.showAlert(data.Error);
        loading.dismiss();
      } else {
        localStorage.setItem('token', data.api_token);
        localStorage.setItem(GlobalProvider.USER_LOCAL, JSON.stringify(data));
        this.globalProv.setToken(data.api_token);
        this.navCtrl.push(StartPage);
        loading.dismiss();
      }
    },
    (err)=>{
      this.showAlert("No se pudo iniciar sesión");
      loading.dismiss();
    });
  }
  
  showAlert(error : string) {
    const alert = this.alertController.create({
      title: 'Error!',
      subTitle: error,
      buttons: ['OK']
    });
    alert.present();
  }

  goSingIn():void{
    this.navCtrl.push(SingInPage);
  }

}
