import { Component, OnInit } from '@angular/core';
import * as quartiers from "src/app/data/quartiers.json";

@Component({
  selector: 'app-demographie',
  templateUrl: './demographie.component.html',
  styles: []
})
export class DemographieComponent implements OnInit {
  population: any;
  loaded: boolean;
  constructor() { }

  ngOnInit() {
    this.population = quartiers.default['features'].map(c => c);
    this.loaded = true;
  }

}
