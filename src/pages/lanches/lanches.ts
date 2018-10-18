import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';
import { ProdutoModel } from '../../model/ProdutoModel';
import { PedidoModel } from '../../model/PedidoModel';
import { UtilModel } from '../../model/UtilModel';

/**
 * Generated class for the LanchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lanches',
  templateUrl: 'lanches.html',
})
export class LanchesPage {

  lanches: Array<ProdutoModel>;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public prov:LanchewsProvider) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LanchesPage');
  }

  ionViewDidEnter(){
    this.prov.getProdutos(UtilModel.CATEGORIA_LANCHES).subscribe(data => {

      //busca os produtos do webservice
      this.lanches = data as Array<ProdutoModel>;
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

    UtilModel.pedidoAtual.addProduto(this.lanches[PosicaoLista]);

    this.navCtrl.parent.select(4);

    //alert("Pediu um "+this.lanches[PosicaoLista].nome);

    //this.navCtrl.push(CarrinhoPage);

    //console.log(PedidoModel.pedidoAtual);
  }

}