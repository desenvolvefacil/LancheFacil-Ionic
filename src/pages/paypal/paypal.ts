import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaypalModel } from '../../model/PaypalModel';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { LanchewsProvider } from '../../providers/lanchews/lanchews';

/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  pag:PaypalModel= new PaypalModel();
  pagamentoAprovado:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal, public prov:LanchewsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaypalPage');
  }

  ionViewDidEnter(){
    this.pag = this.navParams.get("pag");

    this.Pagar();

    //alert(this.pag.descricao);
  }

  Pagar(){
    
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: this.pag.PayPalEnvironmentSandbox
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.pag.valorTotal.toString(), this.pag.tipoMoeda, this.pag.descricao, 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((response) => {

          //console.log(response);

          if((response as any).response.state=="approved"){
            //alterar o Status do pedido pra aprovado no WS
            
            this.pagamentoAprovado=true;

            this.prov.alteraStatusPedido(this.pag.idPedido,1).subscribe(data => {
              //vai para página de pedidos
              //this.navCtrl.push(MeusPedidosPage);

              /*alert("Pagamento Aprovado.");

              this.navCtrl.parent.select(3);*/

              
            });


            
            
          }
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
    
  }

}
