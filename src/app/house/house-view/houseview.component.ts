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
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();


  id: any;
  model: any
  houseStore = new HouseStore();
  imagePath: string

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.houseStore.houseid = this.id;
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('house', this.id)

    this.api.viewHouse(parseInt(this.id))
    .subscribe(
      (res) => {
      this.model = res;
      this.imagePath = this.model.imgPath
    })
  }

  getId(): any {
    return this.houseStore.houseid;
  }


  public uploadHouseImage = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    debugger
    this.http.put(GlobalConstants.BaseURI + `/api/house/upload/${this.id}`, formData, {reportProgress: true}) //observe: 'events'
      .subscribe((path:any) => {
        this.imagePath = path;
      });
  }

  

  // public createImgPath = (serverPath: string) => {
  //   var search = '\\';
  //   var replaceWith = '/';
  //   var result = serverPath.split(search).join(replaceWith);
  //   return `http://localhost:59123/${result}`;
  // }

  // resetModel() {
  //   this.model = new HouseModel(0, "", "", "", "", "", "", "", "");
  // }
}
