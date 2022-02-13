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
  selector: 'app-hall-inspection-view',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.css']
})
export class HallInspectionViewComponent implements OnInit {

  houseId: any
  hallAdminImageModel: ImageModel
  hallTenantImageModel: ImageModel
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
    this.hallAdminImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 2)
    this.hallTenantImageModel = new ImageModel(0, "", "", new Date(), this.houseId, 2)
    this.getHallAdminImages()
    this.getHallTenantImages()
  }

  
  getHallAdminImages(){
    
  }

  getHallTenantImages(){
    
  }

}