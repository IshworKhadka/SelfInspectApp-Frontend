import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';
import { ToastrService } from 'ngx-toastr';
import { TenantModel } from './models/tenant';
import { UserStore } from './user-store.store';

@Injectable()
export class Authservice {
  userStore: UserStore = new UserStore();
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

 
  register(credentials: any) {
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account', credentials).subscribe(res => {
      this.toastr.success('Registered Successfully', 'SUCCESS');
      this.router.navigateByUrl('login');
    });
  }

  inviteUser(email: any){
    debugger
    return this.http.post<any>(GlobalConstants.BaseURI + '/api/account/invite', email);
  }

  login(credentials: any) {
    this.http.post(GlobalConstants.BaseURI + '/api/account/login', credentials).subscribe((res : any) => {
      this.userStore.userRoleId = res.userDetail.roleId;
      localStorage.setItem('role', res.userDetail.roleId)
      this.authenticate(res);
    });
  }

  authenticate(res: any){
    localStorage.setItem('token', res.token)
    this.router.navigateByUrl('dashboard/home');
    this.toastr.success('Welcome!', 'SUCCESS');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }

}
