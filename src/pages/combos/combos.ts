import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoModel } from '../../model/ProdutoModel';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { UtilModel } from '../../model/UtilModel';
import { PedidoModel } from '../../model/PedidoModel';

/**
 * Generated class for the CombosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-combos',
  templateUrl: 'combos.html',
})
export class CombosPage {

  combos: Array<ProdutoModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov:LanchewsProvider) {
  
    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CombosPage');
  }

  ionViewDidEnter(){
    this.prov.getProdutos(UtilModel.CATEGORIA_COMBOS).subscribe(data => {
      //busca os produtos do webservice
      this.combos = data as Array<ProdutoModel>;
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

    UtilModel.pedidoAtual.addProduto(this.combos[PosicaoLista]);

    this.navCtrl.parent.select(4);

    //console.log(PedidoModel.pedidoAtual);

    //this.navCtrl.push(CarrinhoPage);
  }

}