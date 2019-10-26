import { Component, Input, AfterContentChecked, Inject, OnDestroy  } from "@angular/core";
import { DOCUMENT } from '@angular/common';
import { MapGenerator } from "src/app/shared/libs/map.generator";
import * as auchanStore from "src/app/data/auchan_scat.json";
import * as gyData from "src/app/data/limite_gy.json";
import * as gyQuarters from "src/app/data/quartiers.json";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styles: [
    `
      #map {
        height: 85vh;
        border: 1px groove;
        width: 100%;
        z-index: 30;
        overflow: hidden;
      }
    `
  ]
})

export class MapComponent implements AfterContentChecked, OnDestroy {
  private map: any;
  mapLib: MapGenerator;
  centerView: number[];
  auchanStore : any = auchanStore;
  auchanStoreLayer: any;
  gyLayer: any;
  gyQuartersLayer: any;

  @Input() chalandisePage: boolean = false;
  @Input() zonePrimaire: any;
  @Input() zoneSecondaire: any;
  @Input() transport: any;
  @Input() concurents: any;
  @Input() distConcurents: any;
  zonePrimaireLayer: any;
  zoneSecondaireLayer: any;
  transportLayer: any;
  concurentsLayer: any;
  distConcurentsLayer: any;

  @Input() demographiePage: boolean = false;
  @Input() menagesPage: boolean = false;
  @Input() population: any;
  @Input() menages: any;

  populationLayer: any;
  menagesLayer: any;

  customOptions = {
    bottom: "20px",
    className: "myCustomPopupPlacement"
  };
  baseMaps: any;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterContentChecked(): void {
    try {

      this.initMap();
      this.initLayers();
    } catch(e) {
    }
  }

  ngOnDestroy() {
    //this.map.off();
    //this.map.remove();
  }

  initMap(): void {
    this.mapLib = new MapGenerator();
    const mapContainer = this.document.querySelector("#map");
    this.mapLib.init(mapContainer, this.centerView);
    this.map = this.mapLib.createMap();
   // this.searchCtrl = this.mapLib.addFuseSearch;
    this.mapLib.changeDefaultIconPath("assets/images/");
    this.addBasemaps();
    this.mapLib.addGeolocation();
    // if (this.departs) {
    //   this.createDepsLayer(this.departs);
    // }
    // if (this.addRegLayer) {
    //   this.createRegsLayer(this.regions);
    // }
    // this.addControl(this.map, this.baseMaps);
  }
  addBasemaps() {
    this.mapLib.addAttribution(
      "<a href='https://www.linkedin.com/in/sidy-mbengue-a17000143/' target='_blank'>@genius25</a>"
    );
    // const googleStreets = this.mapLib.createABasmapeLayer(
    //   "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    //   true
    // );
    const googleHybrid = this.mapLib.createABasmapeLayer(
      "https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      false
    );
    const OpenStreetMap = this.mapLib.createOSMBasemap();
    this.baseMaps = {
      // tslint:disable-next-line:max-line-length
      //"<div class='layers-control-img'><img src='assets/images/basemaps/googleStreetimage.png'></div>Google Streets": googleStreets,
      // tslint:disable-next-line:max-line-length
      "<div class='layers-control-img'><img src='assets/images/basemaps/googleHybrid.png'></div> Google Hybrid": googleHybrid,
      "<div class='layers-control-img'><img src='assets/images/basemaps/osm.png'></div> OpenStreetMap": OpenStreetMap
    };
    this.mapLib.addBasemapControlLayer(this.baseMaps);
  }


  initLayers() {
    if(this.auchanStore) {
      this.auchanStoreLayer = this.createLayer([this.auchanStore.default], this.auchanStorePopup, "assets/images/auchan.png", [38, 38]);
    }

    if(gyQuarters) {
      this.gyQuartersLayer = this.creatPolygonLayer(gyQuarters.default['features'].map(c => c), this.gyQuartersLayerStyler, this.gyQuartersLayerPopup);
    }
    if (this.chalandisePage) {
      this.gyLayer = this.creatPolygonLayer(gyData.default['features'].map(c => c), this.gyLayerStyler, this.gyLayerPopup);
      this.initChalandiseLayers();
    }
    if (this.demographiePage) {
      this.initDemographyLayers();
    }
    if (this.menagesPage) {
      this.initMenagesLayers();
    }

  }

  initChalandiseLayers() {
    this.zoneSecondaireLayer = this.creatPolygonLayer(this.zoneSecondaire, this.zoneStyler, this.zonesPopup);
    this.zonePrimaireLayer = this.creatPolygonLayer(this.zonePrimaire, this.zoneStyler, this.zonesPopup);
    this.transportLayer = this.creatPolygonLayer(this.transport, this.transportLayerStyler, this.transportLayerPopup, false);
    this.concurentsLayer = this.createLayer(this.concurents, this.concurentsPopup, "assets/images/concurents.png", [22, 24]);
    this.distConcurentsLayer = this.creatPolygonLayer(this.distConcurents, this.distConcurentsLayerStyler, this.distConcurentsLayerPopup);
  }

  initDemographyLayers() {
    this.populationLayer = this.creatPolygonLayer(this.population, this.populationLayerStyler, this.populationLayerPopup);
  }

  initMenagesLayers() {
    this.menagesLayer = this.creatPolygonLayer(this.menages, this.menagesLayerStyler, this.menagesLayerPopup);
  }

  createLayer(data: any[], popupFn: Function, iconUrl: string, iconSIze = [25, 30], styleFn?: Function) {
    const geoJsonData = {
      type: "FeatureCollection",
      features: data
    };
    const layer = this.mapLib.addPointGeoJSONLayer(
      geoJsonData,
      iconUrl,
      iconSIze,
      popupFn
    );
    this.map.addLayer(layer).fitBounds(layer.getBounds());
    return layer;
  }

  creatPolygonLayer(data: any[], styleFn?: Function, popupFn?: Function, fitTolayer = true, addToMap= true) {
    const geoJsonData = {
      type: "FeatureCollection",
      features: data
    };
    const layer = this.mapLib.createPolygonLayer(
      geoJsonData,
      popupFn,
      styleFn
    );
    if(fitTolayer) {
      this.map.addLayer(layer).fitBounds(layer.getBounds());
    }else if(addToMap) {
      this.map.addLayer(layer);
    }
    return layer;
  }

  auchanStorePopup(feature: any, layer: any) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong><i class="fa fa-user-circle" style="font-size:15px"></i> Name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong><i class="fa fa-briefcase" style="font-size:15px;"></i> Address : </strong>
        <h6>${feature.properties.adresse}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-envelope" style="font-size:15px;"></i> Email : </strong>
        <h6>${feature.properties.email}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-phone" style="font-size:15px;"></i> Phone : </strong>
        <h6>${feature.properties.tel}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-envelope" style="font-size:15px;"></i> Geographical cordinates : </strong>
        <h6>Longitude : ${feature.properties.Long}</h6>
        <h6>Latitude : ${feature.properties.Lat}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  gyLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px"></i> Town : </strong>
        <h6>Dakar</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Population : </strong>
        <h6>${feature.properties.population}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Perimeter : </strong>
        <h6>${feature.properties.perimetre} km</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Surface : </strong>
        <h6>${feature.properties.surface} km²</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Population Density (pop/km²) : </strong>
        <h6>${feature.properties.densite} </h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  gyLayerStyler(feature, layer) {
    return {
      fillColor: "none",
      weight: 1.2,
      opacity: 1,
      color: "black",
      fillOpacity: 0.9
    };
  }

  gyQuartersLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px"></i> Name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Population : </strong>
        <h6>${feature.properties.POPULATION}</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Surface : </strong>
        <h6>${feature.properties.surface} ha</h6>
      </div>
      <div class='info'>
        <strong><i class="fas fa-hand-point-right" style="font-size:15px;"></i> Population Density (pop/ha) : </strong>
        <h6>${feature.properties.densite} </h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  gyQuartersLayerStyler(feature, layer) {
    return {
      fillColor: "none",
      weight: 1.2,
      opacity: 1,
      color: "black",
      fillOpacity: 0.9
    };
  }

  concurentsPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong> Name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  toggleLayer(layer: any) {
    if(this.verifyMapHasTheLayer(layer)){
      this.map.removeLayer(layer);
    }
    else {
      this.map.addLayer(layer);
    }
  }

  verifyMapHasTheLayer(layer): boolean {
    return this.map.hasLayer(layer);
  }

  zoneStyler(feature, layer) {
    switch (String(feature.properties['color'])) {
      default:
      return {
        fillColor: feature.properties.color,
        weight: 0.8,
        opacity: 1,
        color: "none",
        fillOpacity: 0.7
      };
    }
  }
  
  zonesPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong> Zone : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong> Surface (ha) : </strong>
        <h6>${feature.properties.surface}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  quartiersLayerStyler(feature, layer) {
    return {
      fillColor: "none",
      weight: 1.1,
      opacity: 1,
      stroke: true,
      color: "red",
      fillOpacity: 1
    };
  }

  quartiersLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong> Quartier : </strong>
        <h6>${feature.properties.QRT}</h6>
      </div>
      <div class='info'>
        <strong>Commune : </strong>
        <h6>${feature.properties.CA_COM_CR}</h6>
      </div>
      <div class='info'>
        <strong>Département : </strong>
        <h6>${feature.properties.NOM_DEP}</h6>
      </div>
      <div class='info'>
        <strong>Région : </strong>
        <h6>${feature.properties.NOM_REG}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  transportLayerStyler(feature, layer) { 
    switch (String(feature.properties['color'])) {
      default:
      return {
        color: feature.properties.color,
        weight: 2,
        opacity: 1,
      };
    }
  }

  transportLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
    <div class='info'>
      <strong>Name : </strong>
      <h6>${feature.properties.nom}</h6>
    </div>
      <div class='info'>
        <strong>Length (km) : </strong>
        <h6>${feature.properties.longueur}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }

  distConcurentsLayerStyler(feature, layer) {
    return {
      weight: 1.5,
      opacity: 1,
      color: "green",
    };
  }

  distConcurentsLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong>Length (m) : </strong>
        <h6>${feature.properties.distance}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }
  
  populationLayerStyler(feature, layer) {
    switch (String(feature.properties['color_pop'])) {
      default:
      return {
        fillColor: feature.properties.color_pop,
        weight: 0.8,
        opacity: 1,
        color: "none",
        fillOpacity: 0.7
      };
    }
  }
  
  populationLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong> Quarter name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong> Population : </strong>
        <h6>Man : ${feature.properties.HOMMES}</h6>
        <h6>Woman : ${feature.properties.FEMMES}</h6>
        <h6>Total : ${feature.properties.POPULATION}</h6>
      </div>
      <div class='info'>
        <strong> Density (population/ha): </strong>
        <h6>${feature.properties.densite}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }
  
  menagesLayerStyler(feature, layer) {
    switch (String(feature.properties['color_mena'])) {
      default:
      return {
        fillColor: feature.properties.color_mena,
        weight: 0.8,
        opacity: 1,
        color: "none",
        fillOpacity: 0.7
      };
    }
  }
  
  menagesLayerPopup(feature, layer) {
    const popupContent = `
    <div class='customPopup'>
      <div class='info'>
        <strong> Quarter name : </strong>
        <h6>${feature.properties.nom}</h6>
      </div>
      <div class='info'>
        <strong> Number of family : </strong>
        <h6>${feature.properties.MENAGES}</h6>
      </div>
      <div class='info'>
        <strong> Density (family/ha): </strong>
        <h6>${feature.properties.dens_menag}</h6>
      </div>
    </div>`;
    layer.onclick = layer.bindPopup(popupContent, this.customOptions);
  }
}
