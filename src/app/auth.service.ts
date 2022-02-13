import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';
import { ToastrService } from 'ngx-toastr';
import { TenantModel } from './models/tenant';
import { UserStore } from './user-store.store';
import { SignalrService, User } from './signalr.service';

@Injectable()
export class Authservice {
  userStore: UserStore = new UserStore();
  public isAuthenticated: boolean = false;

  constructor(private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public signalrService: SignalrService) {
    this.signalrService.startConnection();
    let tempPersonId = localStorage.getItem("personId") || '';

    if (tempPersonId) {
      if (this.signalrService.hubConnection?.state == 'Connected') { //if already connected
        this.reauthMeListener();
        this.reauthMe(tempPersonId);
      }
      else {
        this.signalrService.ssObs().subscribe((obj: any) => {
          if (obj.type == "HubConnStarted") {
            this.reauthMeListener();
            this.reauthMe(tempPersonId);
          }
        });
      }
    }

  }


  register(credentials: any) {
    this.http.post<any>(GlobalConstants.BaseURI + '/api/account', credentials).subscribe(res => {
      this.toastr.success('Registered Successfully', 'SUCCESS');
      this.router.navigateByUrl('login');
    });
  }

  inviteUser(ToEmail: any) {
    let object = {
      ToEmail: ToEmail,
      Subject: "",
      Body: ""
    };
    return this.http.post<any>(GlobalConstants.BaseURI + '/api/account/Invitation', object);
  }

  login(credentials: any) {
    this.http.post(GlobalConstants.BaseURI + '/api/account/login', credentials).subscribe((res: any) => {
      this.authenticate(res);
    });
  }

  authenticate(res: any) {
    localStorage.setItem('token', res.token)
    this.router.navigateByUrl('dashboard/home');
    this.toastr.success('Welcome!', 'SUCCESS');
  }

  logout() {
    this.logOutAuth(localStorage.getItem('personId') as string);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('personId');
    localStorage.removeItem('personName');
    localStorage.removeItem('connId');
    this.isAuthenticated = false;
    this.router.navigateByUrl('login');
  }


  async authMe(model: any) {
    await this.signalrService.hubConnection.invoke("authMe", model)
      .catch((err: any) => console.error(err));
  }

  authMeListenerSuccess() {
    this.signalrService.hubConnection.on("authMeResponseSuccess", (user: User) => {
      this.userStore.userRoleId = user.roleId;
      localStorage.setItem('role', this.userStore.userRoleId.toString())
      localStorage.setItem("personId", user.id);
      localStorage.setItem('personName', user.name);
      localStorage.setItem('connId', user.connId);
      this.signalrService.userData = {...user};
      this.isAuthenticated = true;
    });
  }

  authMeListenerFail() {
    this.signalrService.hubConnection.on("authMeResponseFail", () => {
      this.toastr.error("Wrong Credentials!")
    });
  }

  async reauthMe(personId: string) {
    await this.signalrService.hubConnection.invoke("reauthMe", personId)
      .then(() => { })
      .catch((err: any) => console.error(err));
  }

  reauthMeListener() {
    this.signalrService.hubConnection.on("reauthMeResponse", (user: User) => {
      this.signalrService.userData = {...user};
      this.isAuthenticated = true;
      this.router.navigateByUrl('dashboard/home');
    });
  }

  async logOutAuth(personId: string) {
    await this.signalrService.hubConnection.invoke("logOut", personId)
      .then(() => { })
      .catch((err: any) => console.error(err));
  }

  logOutAuthListener() {
    this.signalrService.hubConnection.on("logOutResponse", () => {
      location.reload();
    });
  }
}
