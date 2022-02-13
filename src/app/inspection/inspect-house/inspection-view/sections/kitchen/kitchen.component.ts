import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { ImageModel } from 'src/app/models/images';


@Component({
  selector: 'app-kitchen-inspection-view',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenInspectionViewComponent implements OnInit {

  houseId: any
  kitchenAdminImageModel: ImageModel
  kitchenTenantImageModel: ImageModel
  originalImages: string[] = []
  submittedImages: string[] = []

  constructor(
    public api: Apiservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.houseId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.kitchenAdminImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 1)
    this.kitchenTenantImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 1)

    this.getKitchenAdminImages()
    this.getKitchenTenantImages()
  }

  getKitchenAdminImages(){
    
  }

  getKitchenTenantImages(){
    
  }

  

}