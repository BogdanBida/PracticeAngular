import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from './table/table.component'
import { UserProfileService } from './../core/userProfile.service'
import { ExternalRoutingService } from '../core/externalRouting.service';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //* Variables ----------------------------------------------------
  userDetails;
  public products;
  currentItem;
  //* Methods -------------------------------------------------------
  constructor(private router: Router, private userService: UserProfileService, private dataService: ExternalRoutingService) { }

  initProducts() {
    this.dataService.getProducts().subscribe(
      res => {
        this.products = res;
        this.currentItem = this.products[this.products.length - 1];
      },
      err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.initProducts();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    )
  }

  changeCurrentItem(item) {
    this.currentItem = item;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
