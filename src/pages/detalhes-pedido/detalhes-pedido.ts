import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoModel } from '../../model/PedidoModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { ItemPedidoModel } from '../../model/ItemPedidoModel';
import { ProdutoModel } from '../../model/ProdutoModel';
import { PaypalPage } from '../paypal/paypal';
import { PaypalModel } from '../../model/PaypalModel';

/**
 * Generated class for the DetalhesPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-pedido',
  templateUrl: 'detalhes-pedido.html',
})
export class DetalhesPedidoPage {

  ped:PedidoModel;
  itens:Array<ItemPedidoModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov:LanchewsProvider) {
    this.ped = navParams.get("pedido");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPedidoPage');
  }

  ionViewDidEnter(){
    this.prov.getItens(this.ped.id).subscribe(data => {
      let aux = data as any;

      this.itens = new Array<ItemPedidoModel>();

      aux.forEach(element => {
        let it = new ItemPedidoModel(null);

        it.qtd = element.qtd;
        it.produto = new ProdutoModel();
        it.produto.nome = element.nome;
        it.produto.valor = element.valor;
        it.produto.foto = element.foto;

        this.itens.push(it);
      });

    });
  }

  Pagar(){
    //alert("Pagamento");
    let p:PaypalModel = new PaypalModel();

    p.idPedido = this.ped.id;
    p.descricao = "Pedido "+ this.ped.id;
    p.valorTotal = this.ped.valorTotal;

    this.navCtrl.push(PaypalPage,{pag:p});
    

  }
  

}
