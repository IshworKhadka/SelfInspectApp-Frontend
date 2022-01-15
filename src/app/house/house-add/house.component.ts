import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/global-constants';
import { Apiservice } from '../../api.service';
import { HouseModel } from '../../models/house';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['../house.component.css']
})
export class HouseComponent {

  constructor(public api : Apiservice, private toastr: ToastrService) {
    
   }

   house_types = GlobalConstants.house_types;

   states = GlobalConstants.states;



  ngOnInit() {
    this.api.houseSelected.subscribe(house => this.model = house)
  }

  // model: HouseModel

  model = new HouseModel(0, "", "", "", "", "","", "", "");

  post(model: HouseModel){
    this.model = model;
    this.api.postHouseDetails(model).subscribe(res => {
      this.resetModel();
      this.toastr.success('House Added Successfully', 'SUCCESS');
    });
    
  }
  put(model: HouseModel){
    model = model;
    this.api.putHouseDetails(model)
    .subscribe((res: any) => {
      this.toastr.success('House Updated Successfully', 'SUCCESS');
    });
    
  }

  resetModel(){
    this.model = new HouseModel(0, "", "", "", "", "","", "", "");
  }

  

}


