import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from 'src/app/api.service';

@Component({
  selector: 'app-inspect-house',
  templateUrl: './inspect-house.component.html',
  styleUrls: ['./../add-schedule.component.css']
})
export class InspectHouseComponent implements OnInit {

  constructor(public api: Apiservice, private router: Router) { }

  inspection_scheules_viewmodel: any
  imageCount: any

  ngOnInit(): void {
    this.api.GetInspectionDetails().subscribe((res: any) => {
      this.inspection_scheules_viewmodel = res;
    });
    
  }
  

}
