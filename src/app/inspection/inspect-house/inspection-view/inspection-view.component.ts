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
  templateUrl: './inspection-view.component.html',
  styleUrls: ['./../../add-schedule.component.css']
})

export class InspectionViewComponent implements OnInit {

  inspectionId: any;
  houseId: any
  inspectionModel: InspectionScheduleModel
  model: HouseModel;

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) {
      this.inspectionId = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    localStorage.setItem('inspection', this.inspectionId);
  }

  

  

  

  
}
