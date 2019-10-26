import { Component, OnInit, Inject } from '@angular/core';
import * as ecoData from "src/app/data/potential.json";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-potentiel-eco',
  templateUrl: './potentiel-eco.component.html',
  styles: []
})
export class PotentielEcoComponent implements OnInit {
  data: any[] = ecoData.default;
  displayedColumns: string[] = ['coef', 'pourcentage', 'mens', 'annuel'];
  analysisData: { x: any[]; y: any[]; type: string; name: string }[];
  layout;
  constructor(
    public dialogRef: MatDialogRef<PotentielEcoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCom: any) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const itemData = {
      x: [],
      y: [],
      type: "bar",
      name: "Economic potential",
      text: [],
      marker: {
        color: '#0277bd'
      }
    };

    this.data.map(d => {
      itemData.x.push(d.coef);
      itemData.y.push(d.pourcentage);
      itemData.text.push(`Mensual: ${d.mens}, Annual: ${d.annuel}`);
    });
    this.layout = {
      title: `ECONOMIC POTENTIAL OF THE CHALANDISE ZONE`,
      // showlegend: true,
      xaxis: {
        showgrid: false
      },
      yaxis: {
        title: "Percentage"
      }
    };

    this.analysisData = [itemData];
  }
}
