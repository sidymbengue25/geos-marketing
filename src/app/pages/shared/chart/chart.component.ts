import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import * as Plotly from "plotly.js/dist/plotly-basic.min.js";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.scss"]
})
export class ChartComponent implements AfterViewInit {
  @Input() chartData;
  @Input() layout;
  @ViewChild("chart", { static: true }) el: ElementRef;
  constructor() {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    const element = this.el.nativeElement;
    const style = {
      margin: { t: 0 }
    };
    if(element) {
      try {
        new Plotly.newPlot(element, this.chartData, this.layout);
      } catch (error) {}
    }
    // this.mobSubs = this.isMobile$.subscribe(res => {
    //   this.isMobile = res;
    //   if (this.isMobile) {
    //     console.log('mob');

    //     this.mobLayout = {
    //       title: this.layoutTitle,
    //       height: 300,
    //       width: 350,
    //       showlegend: false
    //     };
    //     Plotly.newPlot(element, this.chartData, this.mobLayout);
    //   } else {
    //     this.hdLayout = {
    //       title: this.layoutTitle,
    //       height: 400,
    //       width: 700
    //     };
    //     Plotly.newPlot(element, this.chartData, this.hdLayout);
    //   }
    // });

  
  }
}
