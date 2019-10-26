import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ZoneChalandiseComponent } from './zone-chalandise/zone-chalandise.component';
import { DemographieComponent } from './demographie/demographie.component';
import { AccueilComponent } from './accueil.component';
import { MenagesComponent } from './menages/menages.component';


const routes: Routes = [
  {
    path: "",
    component: AccueilComponent, 
    children: [
      {
        path: "chalandise-zone",
        component: ZoneChalandiseComponent
      },
      {
        path: "demography/population",
        component: DemographieComponent
      },
      {
        path: "demography/families",
        component: MenagesComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "chalandise-zone"
      },
      {
        path: "**",
        redirectTo: "chalandise-zone"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule {
  static components = [
    AccueilComponent,
    MainComponent,
    ZoneChalandiseComponent,
    DemographieComponent, 
    MenagesComponent
  ];
 }
