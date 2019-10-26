import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { MapComponent } from '../shared/map/map.component';

@NgModule({
  declarations: [AccueilRoutingModule.components, MapComponent],
  imports: [
    CommonModule,
    AccueilRoutingModule
  ]
})
export class AccueilModule { }
