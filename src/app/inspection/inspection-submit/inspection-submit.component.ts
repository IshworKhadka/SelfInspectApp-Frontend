import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';
import { HouseSectionModel } from 'src/app/models/static-models/house-section';
import { HouseStore } from './house.store';

@Component({
  selector: 'app-inspection-submit',
  templateUrl: './inspection-submit.component.html',
  styleUrls: ['./../add-schedule.component.css']
})

export class InspectionSubmitComponent {
  
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();


  user: any;
  model: any;
  houseStore = new HouseStore();
  imagePath: any

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) {
      this.user = localStorage.getItem('user')  
      // this.houseStore.houseid = this.id;
    }


  
  houseId: any
  ngOnInit() {
    this.api.viewHouseByUserId(this.user).subscribe((res: any) => {
      this.model = res
      this.houseId = res.houseId
      this.imagePath = res.imgpath
      localStorage.setItem('house', this.houseId)
    })
    
    

    // this.api.viewHouseByUserId(this.user)
    // .subscribe(
    //   (res: HouseModel | any) => {
    //   this.model = res;
    //   this.imagePath = this.model.imgpath;
    // })
  }

  getId(): any {
    return this.houseStore.houseid;
  }

  
}
