import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../../api.service';
import { HouseModel } from '../../models/house';
import { TenantModel } from '../../models/tenant';


@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['../tenant.component.css'],
})
export class TenantComponent implements OnInit {
  constructor(public api: Apiservice)  //public dialModRef: MatDialogRef<any>
  {}

  houses: any;
  addresses: string[];

  HouseArray: HouseModel[];

  housesCount: any;

  model = new TenantModel();

  address_concatenated: string;

  ngOnInit() {
    //Subscribe event to display data on fileds while editing
    this.api.tenantSelected.subscribe((tenant) => (this.model = tenant));

    this.api.GetHouseDetails().subscribe((res: any) => {
      this.HouseArray = res;
    });
  }
  //Test using postTenantDetails
  post(model: TenantModel) {
    this.api.postUserDetails(model).subscribe((res) => {
      // this.dialModRef.close({
      //   reloadGrid: true
      // })
      this.resetModel();
    });
  }

  
  put(model: TenantModel) {
    model = model;
    debugger
    this.api.putUserDetails(model);
  }

  resetModel() {
    this.model = new TenantModel();
  }
}
