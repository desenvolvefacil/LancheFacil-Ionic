import { PedidoModel } from "./PedidoModel";
import { UsuarioModel } from "./UsuarioModel";

export class UtilModel{
    public static pedidoAtual:PedidoModel = null;
    public static usuarioLogado:UsuarioModel=null;

    public static CATEGORIA_LANCHES = 1;
    public static CATEGORIA_BEBIDAS = 2;
    public static CATEGORIA_COMBOS = 3;

    public static PAR_PAG_LOGIN = "parametroPaginaLogin";
    public static PAR_PAG_LOGIN_CARRINHO = "returnCarrinho";
    public static PAR_PAG_LOGIN_PEDIDOS = "returnPedidos";

}