import { ProdutoModel } from "./ProdutoModel";
import { ItemPedidoModel } from "./ItemPedidoModel";

export class PedidoModel {

    constructor(){
        this.items = new Array<ItemPedidoModel>();
        this.id=0;
    }

    public id:number;
    public idCliente:number;
    public items:Array<ItemPedidoModel>;
    public numeroMesa:number;
    public status:number;
    public valorTotal:number=0;
    public data:string;
    public hora:string;
    

    get itens(): Array<ItemPedidoModel> {
        this.ordenaItens();

        return this.items;
    }
    
    get corStatus():string{
        switch(this.status.toString()){
            case "1":{
                return "green"
            }default:{
                return "red";
            }
        }
    }

    get nomeStatus():string{
        switch(this.status.toString()){
            case "1":{
                return "Pago"
            }default:{
                return "Pendente";
            }
        }
        
    }

  

    public addProduto(p:ProdutoModel):void{
        //verifica se já existe o produto
        let index = this.items.findIndex(o => o.produto.id == p.id);

        if(index<0){
            let it = new ItemPedidoModel(p);

            this.items.push(it);

            //this.ordenaItens();
        }else{
            this.items[index].qtd++;
        }
    }

    public remProduto(p:ProdutoModel){
        let index = this.items.findIndex(o => o.produto.id == p.id);

        this.items.splice(index,1);

        //this.ordenaItens();
    }

    public addQtd(index:number){
        //let index = this._itens.findIndex(o=>o.produto.id==IdProduto);

        this.items[index].qtd++;
    }

    public remQtd(index:number){
        //let index = this._itens.findIndex(o=>o.produto.id==IdProduto);

        this.items[index].qtd--;

        //caso o produto seja zerado, remove do pedido
        if(this.items[index].qtd<=0){
            this.items.splice(index,1);

            //this.ordenaItens();
        }
    }

    private ordenaItens(){
        //prdena a lista a partir do Comparer Id
        this.items.sort((esq,dir):number=>{
            return esq.produto.id - dir.produto.id;
        });
    }

    get valorTotalPedido():number{
        this.valorTotal= 0 ;

        this.items.forEach(element => {
            this.valorTotal+=element.valorTotal;
        });

        return this.valorTotal;
    }
    

}