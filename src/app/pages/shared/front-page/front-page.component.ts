import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styles: [
    `
      header {
        height: 100px;
        border-bottom: 1px #0277bd solid;
      }
      img {    
        height: 90px;
        width: 217px;
      }
      .mat-icon {
        position: relative;
        top: 30px;
        left: -38px;
        color: #0277bd;
      }
    `
  ]
})
export class FrontPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
