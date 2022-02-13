import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { TenantModel } from 'src/app/models/tenant';

import { ActivityModel } from '../models/activity';
import { HouseModel } from 'src/app/models/house';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tenant-profile',
  templateUrl: './tenant-profile.component.html',
  styleUrls: ['./tenant-profile.component.css'],
})
export class TenantProfileComponent {
  dateObj = new Date();

  days = GlobalConstants.weekday;
  months = GlobalConstants.month;

  id: any;
  model: any;
  HouseArray: HouseModel[];
  a_model: ActivityModel;

  activity_list: ActivityModel[] = [
    new ActivityModel(),
    new ActivityModel(),
    new ActivityModel(),
    // new ActivityModel(1, "Scheduled Inspection", "Sakar Maharjan", 2, this.dateObj,"Scheduled inspection on" + this.dateObj),
    // new ActivityModel(2, "Uploaded Image", "Dipendra Poudel", 2, this.dateObj,"Uploaded images for inspection"),
    // new ActivityModel(3, "Inspection done", "Dinesh Kumar Pun Magar", 2, this.dateObj,"Ownder has given feedback")
  ];

  constructor(
    private api: Apiservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.id = localStorage.getItem('personId');
  }

  ngOnInit() {
    this.api.GetHouseDetails().subscribe((res: any) => {
      this.HouseArray = res;
    });

    if (this.id != null) {
      this.api.viewUser(this.id).subscribe((res) => {
        this.model = res;
        this.model.userId = this.id; //Since the user api does not return id

        this.HouseArray.forEach((element) => {
          if (element.houseId == this.model.houseId) {
            this.model.house_address =
              element.house_number + ' ' + element.street + element.suburb;
          }
        });
      });
    }
  }

  put(model: TenantModel) {
    this.api.putUserDetails(model);
  }

  delete(model: TenantModel) {
    this.api.deleteUser(model).subscribe((res) => {
      this.router.navigateByUrl('tenant/add-tenant');
    });
  }

  public uploadFiles = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .put(
        GlobalConstants.BaseURI + `/api/account/upload/${this.id}`,
        formData,
        { reportProgress: true }
      ) //observe: 'events'
      .subscribe((path: any) => {
        this.model.imagePath = path;
      });
  };

  delete_picture() {
    this.model.imageURL = '../../../assets/img/user.png';
  }
}
