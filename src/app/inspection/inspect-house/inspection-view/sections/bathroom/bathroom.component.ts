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
  selector: 'app-bathroom-inpection-view',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomInspectionViewComponent implements OnInit {

  houseId: any
  bathroomAdminImageModel: ImageModel
  bathroomTenantImageModel: ImageModel
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
    this.bathroomAdminImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 4)
    this.bathroomTenantImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 4)
    this.getBathroomAdminImages()
    this.getBathroomTenantImages()
  }

  getBathroomAdminImages(){
    
  }

  getBathroomTenantImages(){
    
  }

 

}