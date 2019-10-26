import { Component, OnInit } from '@angular/core';
import { CategSocioEcoComponent } from '../categ-socio-eco/categ-socio-eco.component';
import { PotentielEcoComponent } from '../potentiel-eco/potentiel-eco.component';
import { MatDialog } from '@angular/material/dialog';
import { DemoStatsComponent } from '../demo-stats/demo-stats.component';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styles: []
})
export class StatistiquesComponent implements OnInit {
  dialogOptions = {
    minWidth: "80vw",
    minHeight: "95vh",
    closeOnNavigation: false,
    disableClose: true
  };
  constructor( private dialog: MatDialog) {}

  ngOnInit() {
  }

  demoAnalysisPopup(): Promise<"yes" | "no"> {
    const dialogRef = this.dialog.open(DemoStatsComponent, this.dialogOptions);
    return dialogRef.afterClosed().toPromise();
  }

  socialCategPopup(): Promise<"yes" | "no"> {
    const dialogRef = this.dialog.open(CategSocioEcoComponent, this.dialogOptions);
    return dialogRef.afterClosed().toPromise();
  }
  
  ecoPotentielPopup(): Promise<"yes" | "no"> {
    const dialogRef = this.dialog.open(PotentielEcoComponent, this.dialogOptions);
    return dialogRef.afterClosed().toPromise();
  }

}
