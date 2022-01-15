
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from '../../api.service';
import { HouseModel } from '../../models/house';


@Component({
    selector: 'app-house-all',
    templateUrl: './houseall.component.html',
    styleUrls: ['../house.component.css']
  })
  export class HouseAllComponent 
  {

    
    constructor(public api : Apiservice, private router: Router) {
    
    }

    houses: any


    ngOnInit() {
        this.api.GetHouseDetails().subscribe((res: any) => {
          this.houses = res;
        })
        
      }

      delete(model: HouseModel) {
        this.api.deleteHouse(model).subscribe((res) => {
          this.router.navigateByUrl('house/add-house');
        });
      }

      


  }