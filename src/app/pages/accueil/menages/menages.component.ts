import { Component, OnInit } from '@angular/core';
import * as quartiers from "src/app/data/quartiers.json";

@Component({
  selector: 'app-menages',
  templateUrl: './menages.component.html',
  styles: []
})
export class MenagesComponent implements OnInit {
  menages: any;
  loaded: boolean;
  constructor() { }

  ngOnInit() {
    this.menages = quartiers.default['features'].map(c => c);
    this.loaded = true;
  }
}
