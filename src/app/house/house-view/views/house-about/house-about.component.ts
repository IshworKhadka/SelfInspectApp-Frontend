import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';

@Component({
  selector: 'app-house-about',
  templateUrl: './house-about.component.html',
  styleUrls: ['./house-about.component.css']
})
export class HouseAboutComponent implements OnInit {

  model: any;

  constructor(public api: Apiservice, private http: HttpClient, private route: ActivatedRoute,  
    public router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    if(id != null){
        this.api.viewHouse(parseInt(id)).subscribe(res => {
            this.model = res;
          })
    }
  }

}
