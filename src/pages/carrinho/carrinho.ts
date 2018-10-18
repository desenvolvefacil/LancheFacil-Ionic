import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilModel } from '../../model/UtilModel';
import { ItemPedidoModel } from '../../model/ItemPedidoModel';
import { LoginPage } from '../login/login';
import { PedidoModel } from '../../model/PedidoModel';
import { ProdutoModel } from '../../model/ProdutoModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { PaypalModel } from '../../model/PaypalModel';
import { PaypalPage } from '../paypal/paypal';

/**
 * Generated class for the CarrinhoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  itens:Array<ItemPedidoModel>=new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,public prov:LanchewsProvider) {

    
    //console.log("Entrou");
    //this.itens = new Array();

    //console.log(this.itens);

    //this.navCtrl.push(LoginPage, {parametroPaginaLogin: UtilModel.PAR_PAG_LOGIN_CARRINHO});
  }

  ValorTotalPedido:number = 0;

  NumeroMesa:number = 0;
  
  ionViewDidEnter(){
    
    //se houver itens no carrinho
    if(UtilModel.pedidoAtual!=null){
      this.itens = UtilModel.pedidoAtual.itens;
    }

    this.AtualizarValorTotal();

    /*console.log(new Date().toLocaleDateString());
    console.log(new Date().toLocaleTimeString());*/
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CarrinhoPage');

  }


  addQtd(index:number){
    UtilModel.pedidoAtual.addQtd(index);

    this.AtualizarValorTotal();
  }

  remQtd(index:number){
    UtilModel.pedidoAtual.remQtd(index);

    this.AtualizarValorTotal();
  }

  private AtualizarValorTotal(){
    if(UtilModel.pedidoAtual!=null){
      this.ValorTotalPedido = UtilModel.pedidoAtual.valorTotalPedido;
    }

    //Habilita e Desabilita o botão de finalizar pedido
    if(UtilModel.pedidoAtual!=null && UtilModel.pedidoAtual.itens.length>0){
      (<HTMLButtonElement>document.getElementById("btFechaPedido")).disabled = false;
    }else{
      (<HTMLButtonElement>document.getElementById("btFechaPedido")).disabled = true;
    }

  }

  FinalizaPedido(){
    
    //verifica se tem usuario logado
    if(UtilModel.usuarioLogado==null){
      //chama a tela de login
      this.navCtrl.push(LoginPage, {parametroPaginaLogin: UtilModel.PAR_PAG_LOGIN_CARRINHO});
    }else{

      //verifica se setou o número da mesa
      if(this.NumeroMesa>0){
        //finaliza o pedido
        UtilModel.pedidoAtual.idCliente = UtilModel.usuarioLogado.id;
        UtilModel.pedidoAtual.numeroMesa = this.NumeroMesa;
        //seta datahora
        UtilModel.pedidoAtual.data=new Date().toLocaleDateString();
        UtilModel.pedidoAtual.hora=new Date().toLocaleTimeString();



        /**criado novo pedido auxiliar para enviar pro WS e cadastrar */
        /*remove foto e outros atributos na geração do XML*/
        let ped:PedidoModel = new PedidoModel();
        
        ped.idCliente=UtilModel.usuarioLogado.id;
        ped.valorTotal=UtilModel.pedidoAtual.valorTotal;
        ped.numeroMesa = this.NumeroMesa;
        ped.data = UtilModel.pedidoAtual.data;
        ped.hora = UtilModel.pedidoAtual.hora;
        
        
        //passar os itens para o ped
        UtilModel.pedidoAtual.itens.forEach(element => {
          let  it:ItemPedidoModel = new ItemPedidoModel(null);
          
          it.qtd=element.qtd;

          let p:ProdutoModel = new ProdutoModel();

          p.id = element.produto.id;
          p.valor = element.produto.valor;

          it.produto = p;

          ped.items.push(it);

        });

        //console.log(JSON.stringify(ped));

        //chama a função pra salvar
        this.prov.addPedido(ped).subscribe(data => {

          ped = data as PedidoModel;

          if(ped.id>0){
            //alert(ped.id);
            //cria o objeto para pagamento no Paypal

            //chama tela do Paypal
            let p:PaypalModel = new PaypalModel();

            p.idPedido = ped.id;
            p.descricao = "Pedido "+ ped.id;
            p.valorTotal = ped.valorTotal;

            //anula o carrinho
            UtilModel.pedidoAtual = new PedidoModel();

            this.navCtrl.push(PaypalPage,{pag:p});
          }

        });

      }else{
        alert("Digite o número de sua mesa");

        //this.NumeroMesa=10;
      }

    }

  }
}