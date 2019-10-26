import { Component, OnInit } from '@angular/core';
import * as zonePrimaire from "src/app/data/zone_primaire.json";
import * as zoneSecondaire from "src/app/data/zone_secondaire.json";
import * as transport from "src/app/data/ligne_bus_pass_gy.json";
import * as concurents from "src/app/data/concurents.json";
import * as distConcurents from "src/app/data/dist_concurents.json";

@Component({
  selector: 'app-zone-chalandise',
  templateUrl: './zone-chalandise.component.html',
  styles: []
})
export class ZoneChalandiseComponent implements OnInit {
  zonePrimaire: any;
  zoneSecondaire: any;
  transport: any;
  concurents: any;
  distConcurents: any;
  loaded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.zonePrimaire = [zonePrimaire.default];
    this.zoneSecondaire = [zoneSecondaire.default];
    this.transport = transport.default['features'].map(c => c);
    this.concurents = concurents.default['features'].map(c => c);
    this.distConcurents = distConcurents.default['features'].map(c => c);
    this.loaded = true;
  }

}
