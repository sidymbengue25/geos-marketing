import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatListModule } from "@angular/material/list";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontPageComponent } from './pages/shared/front-page/front-page.component';
import { SideMenuComponent } from './pages/shared/side-menu/side-menu.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { ChartComponent } from './pages/shared/chart/chart.component';
import { PotentielEcoComponent } from './pages/accueil/potentiel-eco/potentiel-eco.component';
import { StatistiquesComponent } from './pages/accueil/statistiques/statistiques.component';
import { CategSocioEcoComponent } from './pages/accueil/categ-socio-eco/categ-socio-eco.component';
import { DemoStatsComponent } from './pages/accueil/demo-stats/demo-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    PotentielEcoComponent,
    FrontPageComponent, 
    StatistiquesComponent,
    SideMenuComponent,
    FooterComponent,
    CategSocioEcoComponent,
    DemoStatsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
