import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';


@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomComponent implements OnInit {

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

  ngOnInit(): void {
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

  uploadFiles(): void {
    this.messages = [];

    if (this.fileSource) {
      for (let i = 0; i < this.fileSource.length; i++) {
        this.upload(i, this.fileSource[i]);
      }
    }
  }

  upload(idx: number, file: File | any): void {
    if (file) {
      this.progressInfos[idx] = { value: 0, fileName: file.name };
    }
    if (file) {
      this.http.post(GlobalConstants.BaseURI + '/api/house/Upload', file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.messages.push(msg);
            //this.imageInfos = this.uploadService.getFiles();
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.messages.push(msg);
        }
      });
    }
  }

}