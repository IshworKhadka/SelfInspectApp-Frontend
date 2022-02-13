import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from 'src/app/api.service';
import { HouseModel } from 'src/app/models/house';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';
import { InspectionSubmitModel } from 'src/app/models/inspection-submit';
import { TenantModel } from 'src/app/models/tenant';

@Component({
  selector: 'app-schedule-all',
  templateUrl: './schedule-all.component.html',
  styleUrls: ['./../add-schedule.component.css']
})
export class ScheduleAllComponent implements OnInit {

  constructor(public api: Apiservice, private router: Router) { }

  inspection_schedules: any

  ngOnInit(): void {
    this.api.GetInspectionDetails().subscribe((res: any) => {
      this.inspection_schedules = res;
    });
  }


  currentDate = new Date();
  dateComparator(date: Date){
    if(date > this.currentDate){
      debugger
      return "Pending"
    }
    else{
      debugger
      return "Completed"
    }

  }

  editInspection(model: InspectionScheduleModel){
    
  }

  delete(model: InspectionScheduleModel){
    this.api.deleteInspection(model).subscribe((res: any) => {
      this.router.navigateByUrl('inspection/add-inspection');
    })

  }

}
