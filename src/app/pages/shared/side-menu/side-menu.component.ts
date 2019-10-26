import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
    `
      section {
        height: 100vh;
        background-color: #0277bd;
      }
      .mat-accordion a {
        color: #fff;
      }
      .item {
        height: 40px;
      }
      img {
        height: 25px;
        width: 25px;
        position: relative;
        top: 6px;
        left: -7px;
      }
      .center-content {
        align-items: flex-start;
      }
    `
  ]
})
export class SideMenuComponent implements OnInit {
  popChecked: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateTo(url: string, popChecked: boolean) {
    this.popChecked = popChecked;
    this.router.navigateByUrl(url);
  }

}
