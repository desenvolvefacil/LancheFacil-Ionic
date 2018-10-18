import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CombosPage } from './combos';

@NgModule({
  declarations: [
    CombosPage,
  ],
  imports: [
    IonicPageModule.forChild(CombosPage),
  ],
})
export class CombosPageModule {}
