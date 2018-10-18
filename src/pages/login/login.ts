import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioModel } from '../../model/UsuarioModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { UtilModel } from '../../model/UtilModel';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  
/*
  cadNome:string="";
  cadEmail:string="";
  cadSenha:string="";
  cadConfSenha:string="";
  */

  loginForm: FormGroup;
  cadForm:FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov: LanchewsProvider,public fb: FormBuilder) {
    
    this.loginForm = fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginSenha: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.cadForm = fb.group({
      cadNome: ['', [Validators.required, Validators.minLength(4)]],
      cadEmail: ['', [Validators.required, Validators.email]],
      cadSenha: ['', [Validators.required, Validators.minLength(4)]],
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Logar(){

    if(this.loginForm.valid){

      let usu = new UsuarioModel();
      usu.id = 0;
      usu.nome = "Sem Nome";

      usu.email=this.loginForm.controls["loginEmail"].value;
      usu.senha=this.loginForm.controls["loginSenha"].value;


      this.prov.logar(usu).subscribe(data => {
        //busca os produtos do webservice
        console.log(data);

        usu  = data as UsuarioModel;

        //alert(usu.id);
        if(usu.id>0){
          UtilModel.usuarioLogado = usu;

          //alert(usu.nome);

          //retorna para a pagina que chamou o cadastro
          this.Redireciona();

        }else{
          alert("Cadastro não encontrado");
        }
      });

      //alert(loginEmail+" "+loginSenha);
    }

    //alert(this.loginForm.valid);
    
    /*
    //alert(this.loginEmail);

    //alert(this.navParams.get(UtilModel.PAR_PAG_LOGIN));

    let usu = new UsuarioModel();

    usu.id = 0;

    usu.email = this.loginEmail;
    usu.senha = this.loginSenha;
    usu.nome = "VAZIO";

    //console.log(JSON.stringify(usu));

    
    this.prov.logar(usu).subscribe(data => {
        //busca os produtos do webservice
        console.log(data);

        usu  = data as UsuarioModel;

        //alert(usu.id);
        if(usu.id>0){
          UtilModel.usuarioLogado = usu;

          //alert(usu.id);

          //retorna para a pagina que chamou o cadastro
          this.Redireciona();

        }
      });
      */
  }

  Cadastrar(){
    if(this.cadForm.valid){
      let usu = new UsuarioModel();

      usu.id = 0;

      usu.nome = this.cadForm.controls["cadNome"].value;
      usu.email=this.cadForm.controls["cadEmail"].value;
      usu.senha=this.cadForm.controls["cadSenha"].value;

      console.log(usu);

      this.prov.addCliente(usu).subscribe(data => {
        console.log(data);
        
        //busca os produtos do webservice
        usu  = data as UsuarioModel;
        //console.log(this.lanches);

        //alert(usu.id);
        if(usu.id>0){
          UtilModel.usuarioLogado = usu;

          this.Redireciona();
        }
      });
      
  }

  }

  private Redireciona(){
    if(this.navParams.get(UtilModel.PAR_PAG_LOGIN)==UtilModel.PAR_PAG_LOGIN_PEDIDOS){
      //this.navCtrl.push(MeusPedidosPage);
      this.navCtrl.parent.select(3);
    }else if(this.navParams.get(UtilModel.PAR_PAG_LOGIN)==UtilModel.PAR_PAG_LOGIN_CARRINHO){
      //this.navCtrl.push(CarrinhoPage);
      this.navCtrl.parent.select(4);
    }
  }

}