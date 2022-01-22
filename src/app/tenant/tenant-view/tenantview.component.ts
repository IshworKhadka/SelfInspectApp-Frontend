
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Apiservice } from "src/app/api.service";
import { GlobalConstants } from "src/app/global-constants";
import { TenantModel } from "src/app/models/tenant";

import { ActivityModel } from '../../models/activity';
import { HouseModel } from "src/app/models/house";


@Component({
    selector: 'app-tenant-view',
    templateUrl: './tenantview.component.html',
    styleUrls: ['../tenant.component.css']
})

export class TenantViewComponent {
    /**
     *
     */
    constructor(private api: Apiservice, private route: ActivatedRoute, public router : Router) {
        
    }


    dateObj = new Date();

    days = GlobalConstants.weekday
    months= GlobalConstants.month

    



    model: any
    HouseArray: HouseModel[];
    a_model: ActivityModel

    activity_list: ActivityModel[] = 
    [
        new ActivityModel(),
        new ActivityModel(),
        new ActivityModel()
        // new ActivityModel(1, "Scheduled Inspection", "Sakar Maharjan", 2, this.dateObj,"Scheduled inspection on" + this.dateObj),
        // new ActivityModel(2, "Uploaded Image", "Dipendra Poudel", 2, this.dateObj,"Uploaded images for inspection"),
        // new ActivityModel(3, "Inspection done", "Dinesh Kumar Pun Magar", 2, this.dateObj,"Ownder has given feedback")
    ]

    ngOnInit(){

        this.api.GetHouseDetails().subscribe((res: any) => {
            this.HouseArray = res;
          });
        var id = this.route.snapshot.paramMap.get('id');

        if(id != null){
            this.api.viewTenant(parseInt(id)).subscribe(res => {
                this.model = res;

                this.HouseArray.forEach(element => {
                    if(element.houseId == this.model.houseId){
                        this.model.house_address = element.house_number + " " + element.street + element.suburb;
                    }
                });
              })
        }


    }

    put(model: TenantModel){
        this.api.putTenantDetails(model);

    }

    delete(model: TenantModel){
        this.api.deleteTenant(model).subscribe(res => {
            this.router.navigateByUrl('tenant/add-tenant');
        })
    }


    delete_picture(){
        this.model.imageURL = "../../../assets/img/user.png";
    }

}