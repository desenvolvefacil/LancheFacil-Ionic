import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams/*, ModalController*/ } from 'ionic-angular';
import { UtilModel } from '../../model/UtilModel';
import { LoginPage } from '../login/login';
import { PedidoModel } from '../../model/PedidoModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { DetalhesPedidoPage } from '../detalhes-pedido/detalhes-pedido';

/**
 * Generated class for the MeusPedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-pedidos',
  templateUrl: 'meus-pedidos.html',
})
export class MeusPedidosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public prov:LanchewsProvider) {
  }

  NomeUsuario:string="";

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusPedidosPage');
  }

  pedidos:Array<PedidoModel>;

  ionViewDidEnter(){
    //console.log('ionViewDidEnter CarrinhoPage');

    //se não tiver usuario logado, redireciona pra pagina de login
    if(UtilModel.usuarioLogado==null){
      this.NomeUsuario="";

      this.navCtrl.push(LoginPage, {parametroPaginaLogin: UtilModel.PAR_PAG_LOGIN_PEDIDOS});
      /*let modal = this.modalCtrl.create(LoginPage);
      modal.present();*/
      
    }else{
      this.NomeUsuario = UtilModel.usuarioLogado.nome;

      //busca os pedidos do usuario no WS

        this.prov.getPedidos(UtilModel.usuarioLogado.id).subscribe(data => {

          //console.log(data);

        //busca os produtos do webservice
        let pedRet = data as Array<PedidoModel>;

        this.pedidos = new Array<PedidoModel>();

        //passa os dados do retorno pro pedido corrente
        pedRet.forEach(element => {
           let o = new PedidoModel();

            o.id = element.id;
            o.numeroMesa = element.numeroMesa;
            o.data = element.data;
            o.hora = element.hora;
            o.status = element.status;
            o.valorTotal = element.valorTotal;

            this.pedidos.push(o);
        });
        
        //console.log(this.pedidos);

      });
    }
  }

  Sair(){
    UtilModel.usuarioLogado = null;

    this.navCtrl.parent.select(1);
  }

  Detalhar(Index:number){
    this.navCtrl.push(DetalhesPedidoPage,{pedido:this.pedidos[Index]});
  }

}