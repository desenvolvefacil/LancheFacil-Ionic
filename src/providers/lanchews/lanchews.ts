import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../model/UsuarioModel';
import { PedidoModel } from '../../model/PedidoModel';

/*
  Generated class for the LanchewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LanchewsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LanchewsProvider Provider');
  }

  public getProdutos(IdCategoria:number){
    return this.http.get("http://testefacil.tk/lanchefacil/produtos/"+IdCategoria);
  }

  public addCliente(usu:UsuarioModel){
    return this.http.post("http://testefacil.tk/lanchefacil/usuario",JSON.stringify(usu));
  }

  public logar(usu:UsuarioModel){
    return this.http.post("http://testefacil.tk/lanchefacil/login",JSON.stringify(usu));
  }

  public addPedido(ped:PedidoModel){
    return this.http.post("http://testefacil.tk/lanchefacil/pedido",JSON.stringify(ped));
  }

  public getPedidos(idUsuario:number){
    return this.http.get("http://testefacil.tk/lanchefacil/pedidos/"+idUsuario);
  }

  public getItens(idPedido:number){
    return this.http.get("http://testefacil.tk/lanchefacil/items/"+idPedido);
  }

  public alteraStatusPedido(idPedido:number,status:number){
    return this.http.post("http://testefacil.tk/lanchefacil/alterastatus",'{"idPedido":"'+idPedido+'","status":"'+status+'"}');
  }

}