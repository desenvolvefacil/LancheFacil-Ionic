import { ProdutoModel } from "./ProdutoModel";

export class ItemPedidoModel{
    public qtd:number;
    public produto:ProdutoModel;

    constructor(p:ProdutoModel){
        if(p!=null){
            this.produto = p;
            this.qtd=1;
        }
    }


    get valorTotal():number{
        return this.qtd*this.produto.valor;
    }

    


}