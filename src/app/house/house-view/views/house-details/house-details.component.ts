import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Apiservice } from 'src/app/api.service';
import { GlobalConstants } from 'src/app/global-constants';
import { HouseModel } from 'src/app/models/house';
import { HouseStore } from '../../house.store';
import { HouseViewComponent } from '../../houseview.component';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {

  imageUrl: string = '/assets/img/';

  house_types = GlobalConstants.house_types;

  states = GlobalConstants.states;

  model: any;
  id: any;

  constructor(
    public api: Apiservice,
    private http: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private home: HouseViewComponent) {
  }

  ngOnInit(): void {
    this.id = this.home.houseStore.houseid;

    if (this.id != null) {
      this.api.viewHouse(parseInt(this.id))
      .subscribe(
        (res: HouseModel | any) => {
        this.model = res;
      })
    }
  }

  put(model: HouseModel) {
    this.api.putHouseDetails(model)
      .subscribe((res: any) => {
        this.toastr.success('House Updated Successfully', 'SUCCESS');
      });
  }

  delete(model: HouseModel) {
    this.api.deleteHouse(model).subscribe(res => {
      this.router.navigateByUrl('house/add-house');
    })

  }
}
