import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LanchewsProvider } from '../providers/lanchews/lanchews';

//importa o modulo Http
import{HttpClientModule} from '@angular/common/http';

import { TabsPage } from '../pages/tabs/tabs';
import { LanchesPage } from '../pages/lanches/lanches';
import { BebidasPage } from '../pages/bebidas/bebidas';
import { CombosPage } from '../pages/combos/combos';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { LoginPage } from '../pages/login/login';
import { MeusPedidosPage } from '../pages/meus-pedidos/meus-pedidos';
import { DetalhesPedidoPage } from '../pages/detalhes-pedido/detalhes-pedido';
import { PaypalPage } from '../pages/paypal/paypal';

//importa o paypal nativo
import { PayPal } from '@ionic-native/paypal';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LanchesPage,
    BebidasPage,
    CombosPage,
    CarrinhoPage,
    LoginPage,
    MeusPedidosPage,
    DetalhesPedidoPage,
    PaypalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LanchesPage,
    BebidasPage,
    CombosPage,
    CarrinhoPage,
    LoginPage,
    MeusPedidosPage,
    DetalhesPedidoPage,
    PaypalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LanchewsProvider,
    PayPal
  ]
})
export class AppModule {}
