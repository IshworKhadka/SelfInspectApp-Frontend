import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { Apiservice } from '../../api.service';

@Component({
  selector: 'app-house-room',
  templateUrl: './houseview.component.html',
  styleUrls: ['../house.component.css'],
})
export class HouseViewComponent {
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
      .post(GlobalConstants.BaseURI + '/api/house', formData, {
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
  };

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
