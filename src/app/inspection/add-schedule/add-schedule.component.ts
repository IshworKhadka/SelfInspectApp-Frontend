import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Apiservice } from 'src/app/api.service';
import { HouseModel } from 'src/app/models/house';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';
import { TenantModel } from 'src/app/models/tenant';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  
  styleUrls: ['./../add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  constructor(public api: Apiservice, private toastr: ToastrService) { }

  model = new InspectionScheduleModel();
  house: HouseModel
  tenant: TenantModel
  HouseArray: HouseModel[]
  TenantArray: TenantModel[]
  tenantList: any



  ngOnInit(): void {
    this.api.inspectionSelected.subscribe(inspection => this.model = inspection)

    this.api.GetHouseDetails().subscribe((res: any) => {
      this.HouseArray = res;
    });
    this.api.GetTenantDetails().subscribe((res: any) => {
      this.TenantArray = res;
    });

  }

  onHouseSelected(){
    this.tenantList = new Array();
    for(let i=0; i< this.TenantArray.length; i++){
      if(this.TenantArray[i].houseId == this.model.houseId){
        this.tenantList.push(this.TenantArray[i]);
      }
    }
  }


  post(model: InspectionScheduleModel){
    this.api.postInspectionDetails(model).subscribe((res: any) => {
      this.resetModel();
      this.toastr.success('Inspection Scheduled Successfully', 'SUCCESS');
    });

  }

  put(model: InspectionScheduleModel){
    this.api.putInspectionDetails(model).subscribe((res: any) => {
      this.toastr.success('Inspection Schedule Updated', 'SUCCESS');
    });
  }

  resetModel(){
    this.model = new InspectionScheduleModel();
  }

}
