import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { Apiservice } from '../../api.service';
import { HouseStore } from './house-store';

@Component({
  selector: 'app-house-room',
  templateUrl: './houseview.component.html',
  styleUrls: ['../house.component.css'],
})
export class HouseViewComponent {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();


  id: any;
  houseStore = new HouseStore();
  imagePath: any

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
  editPicture(){
    
  }

  public uploadFiles = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.put(GlobalConstants.BaseURI + `/api/house/upload/${this.id}`, formData, {reportProgress: true}) //observe: 'events'
      .subscribe((path:any) => {
        this.imagePath = path;
        debugger
        // if (event.type === HttpEventType.UploadProgress)
        //   this.progress = Math.round(100 * event.loaded / event.total);
        // else if (event.type === HttpEventType.Response) {
        //   this.message = 'Upload success.';
        //   this.onUploadFinished.emit(event.body);
        // }
      });
  }

  public createImgPath = (serverPath: string) => {
    var search = '\\';
    var replaceWith = '/';
    var result = serverPath.split(search).join(replaceWith);
    return `http://localhost:59123/${result}`;
  }

  delete_picture(){

  }

  AddToLocalStorage(model: HouseModel) {}

  UpdateLocalStorage(model: HouseModel) {}

  // resetModel() {
  //   this.model = new HouseModel(0, "", "", "", "", "", "", "", "");
  // }
}
