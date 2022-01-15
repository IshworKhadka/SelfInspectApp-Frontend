import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from 'src/app/api.service';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';

@Component({
  selector: 'app-schedule-all',
  templateUrl: './schedule-all.component.html',
  styleUrls: ['./../add-schedule.component.css']
})
export class ScheduleAllComponent implements OnInit {

  constructor(public api: Apiservice, private router: Router) { }

  inspection_schedules: any

  ngOnInit(): void {
    this.api.GetInspectionDetails().subscribe(res => {
      this.inspection_schedules = res;
    });
  }

  editInspection(model: InspectionScheduleModel){
    
  }

  delete(model: InspectionScheduleModel){
    this.api.deleteInspection(model).subscribe((res: any) => {
      this.router.navigateByUrl('inspection/add-inspection');
    })

  }

}
