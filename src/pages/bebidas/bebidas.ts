import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoModel } from '../../model/ProdutoModel';
import { UtilModel } from '../../model/UtilModel';
import { PedidoModel } from '../../model/PedidoModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';



/**
 * Generated class for the BebidasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bebidas',
  templateUrl: 'bebidas.html',
})
export class BebidasPage {

  //p:ProdutoModel;

  bebidas: Array<ProdutoModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov:LanchewsProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BebidasPage');
  }

  ionViewDidEnter(){
    this.prov.getProdutos(UtilModel.CATEGORIA_BEBIDAS).subscribe(data => {

      //busca os produtos do webservice
      this.bebidas = data as Array<ProdutoModel>;
      //console.log(this.lanches);
    });
  }

  Pedir(PosicaoLista:number){
    //console.log("Pediu um número: "+PosicaoLista);

    //console.log( this.lanches[PosicaoLista]);

    //console.log(pedido);

    //verifica se o pedido esta nutlo
    if(UtilModel.pedidoAtual == null){
      UtilModel.pedidoAtual = new PedidoModel();
      console.log("Criou Pedido");
    }

    UtilModel.pedidoAtual.addProduto(this.bebidas[PosicaoLista]);


    this.navCtrl.parent.select(4);

    //this.navCtrl.push(CarrinhoPage);
    
    //console.log(PedidoModel.pedidoAtual);
  }

}