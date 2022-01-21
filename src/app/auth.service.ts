import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HouseModel } from './models/house';
import { Observable, Subject } from 'rxjs';
import { TenantModel } from './models/tenant';
import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';
import { InspectionScheduleModel } from './models/inspection-schedule';

@Injectable()
export class Authservice {
  constructor(private http: HttpClient, private router: Router) {}

 
  register(credentials: any) {
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account', credentials).subscribe(res => {
        console.log(res);

        localStorage.setItem('token', res)
    });
  }
  


}
