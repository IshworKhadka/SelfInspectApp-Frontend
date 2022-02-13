import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { FeedbackModel } from 'src/app/models/feedback';
import { HouseModel } from 'src/app/models/house';
import { ImageModel } from 'src/app/models/images';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';


@Component({
  selector: 'app-bedroom-inspection-view',
  templateUrl: './bedroom.component.html',
  styleUrls: ['./bedroom.component.css']
})
export class BedroomInspectionViewComponent implements OnInit {

  inspectionId: any
  model: any
  bedroomAdminImageModel: ImageModel 
  bedroomTenantImageModel: ImageModel
  

  

  originalImages: string[] = [
    "http://localhost:59123/House/Images/273231251_466189048307946_489009288838220001_n.jpg",
    "http://localhost:59123/House/Images/272898360_670257547453172_5098517684671907292_n.jpg",
    "http://localhost:59123/House/Images/273700740_681680973007137_79272562131544471_n.jpg"
]
  submittedImages: string[] = [
    "http://localhost:59123/House/Images/273784936_407221234491711_4922165214351751361_n.jpg",
    "http://localhost:59123/House/Images/272939298_520711985987073_2391156922522486174_n.jpg",
    "http://localhost:59123/House/Images/273143600_506076084272106_8850108914067823588_n.jpg"
  ]


  constructor(
    public api: Apiservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) 
  {
    this.inspectionId = this.route.snapshot.paramMap.get('id');
   }

  

  ngOnInit(): void {
    this.inspectionId = localStorage.getItem('inspection')
    this.getInspectiondetails(this.inspectionId)
    localStorage.setItem('section', '3')
    

    //Get Images
    this.getBedroomAdminImages()
   
    // this.api.GetImagesForInspection(this.model).subscribe((response1: any) => {
    //   console.log(this.bedroomAdminImageModel)
    //   console.log(response1)
    //   this.originalImages = response1
    // })

    // this.api.GetImagesForInspection(this.bedroomTenantImageModel).subscribe((response2: any) => {
    //   this.submittedImages = response2
    // })

    this.getBedroomATenantImages()

  }

  getInspectiondetails(id: any){
    this.api.viewInspection(id).subscribe((res: any) => {
      this.model = res

      this.bedroomAdminImageModel= new ImageModel
        (0, "", "admin", new Date(), this.model.houseId, 3)

      this.bedroomTenantImageModel = new ImageModel
        (0, "", this.model.userId, new Date(), this.model.houseId, 3)

        // this.api.GetImagesForInspection(this.bedroomAdminImageModel).subscribe((res1: any) => {
        //   this.originalImages = res1
        // })

        // this.api.GetImagesForInspection(this.bedroomTenantImageModel).subscribe((res2: any) => {
        //   this.submittedImages = res2
        // })
    })
  }

  //Admin
  getBedroomAdminImages(){
    this.api.GetImagesForInspection(this.bedroomAdminImageModel).subscribe((res: any) => {
      this.originalImages = res
      debugger
    })
  }

  // //Tenants
  getBedroomATenantImages(){
    // this.bedroomTenantImageModel = new ImageModel
    // (0, "", this.model.submittedBy, new Date(), this.model.houseId, 3)

    this.api.GetImagesForInspection(this.bedroomTenantImageModel).subscribe((res: any) => {
      this.submittedImages = res
    })

  }
  

}