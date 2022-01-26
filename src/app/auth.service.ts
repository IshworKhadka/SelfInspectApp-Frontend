import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class Authservice {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

 
  register(credentials: any) {
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account', credentials).subscribe(res => {
      this.toastr.success('Registered Successfully', 'SUCCESS');
      this.router.navigateByUrl('login');
    });
  }

  login(credentials: any) {
    debugger
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account/login', credentials).subscribe(res => {
      this.authenticate(res);
    });
  }

  authenticate(res: any){
    localStorage.setItem('token', res)
    this.router.navigateByUrl('dashboard/home');
    this.toastr.success('Welcome!', 'SUCCESS');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

}
