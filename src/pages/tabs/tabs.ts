import { Component} from '@angular/core';

import { LanchesPage } from '../lanches/lanches';
import { BebidasPage } from '../bebidas/bebidas';
import { CombosPage } from '../combos/combos';
import { CarrinhoPage } from '../carrinho/carrinho';
import { MeusPedidosPage } from '../meus-pedidos/meus-pedidos';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  //i:number = 1;

  //@ViewChild('myTabs') tabRef: Tabs;

  tabLanches = LanchesPage;
  tabBebidas = BebidasPage;
  tabCombos = CombosPage;
  tabCarrinho = CarrinhoPage;
  tabPedidos = MeusPedidosPage;

  constructor() {
    
  }

  /*
  ionViewWillEnter() {
    //this.tabRef.select(1);
    this.i=this.i+5;
    this.tabRef.getByIndex(2).tabTitle=(this.i).toString();

    console.log("Entrou "+ this.i);
   }
  */
   

}