import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: Apiservice) { }

  inspection_schedules: any

  ngOnInit(): void {
    this.getHousesCount();
    this.getTenantsCount();
    this.api.GetInspectionDetails().subscribe(res => {
      this.inspection_schedules = res;
    });
  }

  //Get Count
  housesCount: any;
  getHousesCount(){
    this.api.GetHouseDetails().subscribe((res: any) => {
      this.housesCount = res.length;
    })
  }
  tenantsCount: any;
  getTenantsCount(){
      this.api.GetTenantDetails().subscribe((res: any) => {
        this.tenantsCount = res.length;
      })
  }

}
