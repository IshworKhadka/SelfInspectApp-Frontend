import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-constants';
import { InspectionScheduleModel } from 'src/app/models/inspection-schedule';

@Component({
  selector: 'app-inspection-submit',
  templateUrl: './inspection-submit.component.html',
  styleUrls: ['./../add-schedule.component.css']
})
export class InspectionSubmitComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute,  
    public router : Router) { }

  ngOnInit(): void {
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
    console.log(formData)

   

    this.http
      .post(GlobalConstants.BaseURI + '/api/inspectionsubmit', formData, {
        reportProgress: true,
        observe: 'events',
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

      debugger
  };


  put(model: InspectionScheduleModel){

  }

  delete(model: InspectionScheduleModel){

  }

  delete_picture(){

  }
}
