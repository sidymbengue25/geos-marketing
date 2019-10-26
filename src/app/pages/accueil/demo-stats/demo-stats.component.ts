import { Component, OnInit, Inject } from '@angular/core';
import * as demoStats from "src/app/data/demo_stats.json";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-stats',
  templateUrl: './demo-stats.component.html',
  styles: []
})
export class DemoStatsComponent implements OnInit {
  data: any[] = demoStats.default;
  displayedColumns: string[] = ['age', 'pourcentage', 'zone_chalandise', 'primaire', 'secondaire'];
  analysisData: { labels: any[]; values: any[]; type: string}[];
  layout: any;

  constructor(
    public dialogRef: MatDialogRef<DemoStatsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataFromCom: any) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const itemData = {
      labels: [],
      values: [],
      type: "pie"
    };

    this.data.map(d => {
      itemData.labels.push(`Age : ${d.age}`);
      itemData.values.push(d.pourcentage);
     // itemData.text.push(`Primary Zone: ${d.primaire}, Secondary Zone: ${d.secondaire}`);
    });

    this.layout = {
      title: `Demographic analysis of the catchment area`,
      // showlegend: true,
      height: 600,
      width: 800
    };

    this.analysisData = [itemData];
  }
}
