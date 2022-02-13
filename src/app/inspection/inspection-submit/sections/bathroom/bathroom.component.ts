import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';


@Component({
  selector: 'app-bathroom-submit',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomSubmitComponent implements OnInit {

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  messages: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  fileSource: any[] = [];

  constructor(
    public api: Apiservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) { }

  user: any
  houseId: any
  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.houseId = localStorage.getItem('house')
  }

  onFileChange(event: any) {
    this.messages = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    this.fileSource = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        this.fileSource[i] = this.selectedFiles[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  removeImage(idx: number) {
    for (var i = 0; i < this.previews.length; i++) {
      if (i === idx) {
        this.previews.splice(i, 1);
        this.fileSource.splice(i, 1);
      }
    }
  }

  uploadSectionImage(): void {
    this.messages = [];
    var files = this.fileSource;

    if (files.length === 0) {
      return;
    }
    let filesToUpload : File[] = files;
    const formData = new FormData();
      
    Array.from(filesToUpload).map((file, index) => {
      return formData.append('file'+index, file, file.name);
    });
    formData.append('HouseId', '1');
    formData.append('SectionId', '4');
    formData.append('SubmittedBy', this.user)

    this.http.post(GlobalConstants.BaseURI + '/api/house/Upload', formData)
    .subscribe({
      next: (event: any) => {
        this.toastr.success('Image Uploaded', 'SUCCESS')
        if (event.type === HttpEventType.UploadProgress) {
          //this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          //const msg = 'Uploaded the file successfully: ' + file.name;
          //this.messages.push(msg);
          //this.imageInfos = this.uploadService.getFiles();
        }
      },
      error: (err: any) => {
        //this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file';
        this.messages.push(msg);
      }
    });
  }

}