import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/api.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['../house.component.css']
})
export class HouseListComponent implements OnInit {

  constructor(public api: Apiservice) { }

  houses: any

  ngOnInit(): void {
    this.api.GetHouseDetails().subscribe((res: any) => {
      this.houses = res;
    })
  }

}
