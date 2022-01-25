import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';
import { HouseSectionModel } from 'src/app/models/static-models/house-section';

@Component({
  selector: 'app-inspection-submit',
  templateUrl: './inspection-submit.component.html',
  styleUrls: ['./../add-schedule.component.css']
})

export class InspectionSubmitComponent {
  
  constructor(private http: HttpClient, private route: ActivatedRoute,  public router : Router, public api: Apiservice) 
  { 
  }

  housesections: any

  ngOnInit(): void {
    this.api.GetHouseSectionDetails().subscribe((res: any) => {
      this.housesections = res;
    })
  }

  progress: number
  message: string
  @Output() public onUploadFinished = new EventEmitter();

  model: any

  public uploadFile = (files: any) => {
    if (files.length == 0) {
      return;
    }

    let filesTeUpload: File[] = files;
    const formData = new FormData();

    Array.from(filesTeUpload).map((file, index) => {
      return formData.append('file' + index, file, file.name);
    });
   

    this.http
      .post(GlobalConstants.BaseURI + '/api/inspectionsubmit/upload', formData, {
        reportProgress: true,
        observe: 'events',
        responseType: 'json'
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(
            (100 * event.loaded) / (event.total as number)
          );
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload Successful';
          this.onUploadFinished.emit(event.body);
        }
      });
  };

  


  put(model: InspectionScheduleModel){

  }

  delete(model: InspectionScheduleModel){

  }

  delete_picture(){

  }
}
