import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { Apiservice } from '../../api.service';

@Component({
  selector: 'app-house-room',
  templateUrl: './houseview.component.html',
  styleUrls: ['../house.component.css'],
})
export class HouseViewComponent {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  messages: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;

  imageUrl: string = '/assets/img/';

  house_types = GlobalConstants.house_types;

  states = GlobalConstants.states;

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) {}

  model: any;

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    if(id != null){
        this.api.viewHouse(parseInt(id)).subscribe(res => {
            this.model = res;
          })
    }
  }

  onFileChange(event : any) {
    this.messages = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  removeImage(idx: number){
    for(var i =0; i < this.previews.length; i++){
      if(i === idx){
        this.previews.splice(i,1);
      }
    }
  }

  uploadFiles(): void {
    this.messages = [];
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {
      this.http.post(GlobalConstants.BaseURI + '/api/house', file).subscribe({
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
        }});
    }
  }

  // public uploadFile = () => {
  //   if (files.length == 0) {
  //     return;
  //   }

  //   let filesTeUpload: File[] = files;
  //   const formData = new FormData();

  //   Array.from(filesTeUpload).map((file, index) => {
  //     return formData.append('file' + index, file, file.name);
  //   });
  //   console.log(formData)

  //   this.http
  //     .post(GlobalConstants.BaseURI + '/api/house', formData, {
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .subscribe((event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(
  //           (100 * event.loaded) / (event.total as number)
  //         );
  //       } else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload Successful';
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     });
  // };

  put(model: HouseModel){
    this.api.putHouseDetails(model)
    .subscribe((res: any) => {
      this.toastr.success('House Updated Successfully', 'SUCCESS');
    });
  }

  delete(model: HouseModel){
    this.api.deleteHouse(model).subscribe(res => {
      this.router.navigateByUrl('house/add-house');
  })

  }

  delete_picture(){

  }

  AddToLocalStorage(model: HouseModel) {}

  UpdateLocalStorage(model: HouseModel) {}

  resetModel() {
    this.model = new HouseModel(0, "", "", "", "", "", "", "", "");
  }
}
