import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { Apiservice } from '../../api.service';
import { HouseStore } from './house.store';

@Component({
  selector: 'app-house-room',
  templateUrl: './houseview.component.html',
  styleUrls: ['../house.component.css'],
})
export class HouseViewComponent {
  id: any;
  houseStore = new HouseStore();

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) {
      
      this.id = this.route.snapshot.paramMap.get('id');
      this.houseStore.houseid = this.id;
    }

  ngOnInit() {
  }

  getId(): any {
    return this.houseStore.houseid;
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

  delete_picture(){

  }

  AddToLocalStorage(model: HouseModel) {}

  UpdateLocalStorage(model: HouseModel) {}

  // resetModel() {
  //   this.model = new HouseModel(0, "", "", "", "", "", "", "", "");
  // }
}
