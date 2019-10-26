import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as socioEco from "src/app/data/socio_eco.json";

@Component({
  selector: 'app-categ-socio-eco',
  templateUrl: './categ-socio-eco.component.html',
  styles: []
})
export class CategSocioEcoComponent implements OnInit {
  data: any[] = socioEco.default;
  displayedColumns: string[] = ['status', 'pourcentage', 'zone_chalandise', 'primaire', 'secondaire'];
  analysisData: { x: any[]; y: any[]; type: string; name: string }[];
  layout;
  constructor(
    public dialogRef: MatDialogRef<CategSocioEcoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCom: any) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const itemData = {
      x: [],
      y: [],
      type: "bar",
      name: "Socio-Professional categories",
      text: [],
      marker: {
        color: '#ff6f00'
      }
    };

    this.data.map(d => {
      itemData.x.push(d.status);
      itemData.y.push(d.pourcentage);
      itemData.text.push(`Primary Zone: ${d.primaire}, Secondary Zone: ${d.secondaire}`);
    });
    this.layout = {
      title: `Breakdown of assets in the chalandise zone`,
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
