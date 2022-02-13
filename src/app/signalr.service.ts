import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as signalR from "@microsoft/signalr";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import { GlobalConstants } from "./global-constants";

export class User {
    public id: string;
    public name: string;
    public roleId: number;
    public connId: string;//signalr
    public msgs: Array<Message>;  //(only client-side property)
}

export class Message {
    constructor(
      public content: string,
      public mine: boolean
    ) {}
  }

@Injectable()
export class SignalrService {
    hubConnection: signalR.HubConnection;
    userData: User;

    constructor(
        public router: Router,
        public toastr: ToastrService,
    ) { 
        // if(this.userData?.name == null){
        //     this.userData.name = localStorage.getItem('personName') == "undefined" ? '' : localStorage.getItem('personName') || '';
        // }
    }
   
    ssSubj = new Subject<any>();
    ssObs(): Observable<any> {
        return this.ssSubj.asObservable();
    }

    startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(GlobalConstants.BaseURI + '/toastr', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
        this.hubConnection
            .start()
            .then(() => {
                this.ssSubj.next({type: "HubConnStarted"});
            })
            .catch((err: any) => console.log('Error while connecting hub: ' + err))
    }

}
