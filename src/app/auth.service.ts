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

  inviteUser(userId: string){
    debugger
    return this.http.post<any>(GlobalConstants.BaseURI + '/api/account/invite', userId);
  }

  login(credentials: any) {
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account/login', credentials).subscribe((res : any) => {
      this.authenticate(res);
    });
  }

  authenticate(res: any){
    debugger
    localStorage.setItem('token', res.token)
    this.router.navigateByUrl('dashboard/home');
    this.toastr.success('Welcome!', 'SUCCESS');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

}
