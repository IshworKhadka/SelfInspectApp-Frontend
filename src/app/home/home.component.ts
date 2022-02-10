import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../api.service';
import { Authservice } from '../auth.service';
import { Message, SignalrService, User } from '../signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: Apiservice,
    public authService: Authservice,
    public signalrService: SignalrService
    ) { }

  users: Array<User> = new Array<User>();
  selectedUser: User;
  msg: string;
  inspection_schedules: any
  connId : string;
  userId : string;

  ngOnInit(): void {
    this.getHousesCount();
    this.getTenantsCount();
    this.api.GetInspectionDetails().subscribe(res => {
      this.inspection_schedules = res;
    });

    this.userOnLis();
    this.userOffLis();
    this.authService.logOutAuthListener();
    this.getOnlineUsersLis();
    this.sendMsgLis();

    this.connId = localStorage.getItem('connId') as string;
    this.userId = localStorage.getItem('personId') as string;

    //hubConnection.state is 1 when hub connection is connected.
    if (this.signalrService.hubConnection.state == 'Connected') this.getOnlineUsersInv();
    else {
      this.signalrService.ssSubj.subscribe((obj: any) => {
        if (obj.type == "HubConnStarted") {
          this.getOnlineUsersInv();
        }
      });
    }
  }

  //Get Count
  housesCount: any;
  getHousesCount(){
    this.api.GetHouseDetails().subscribe((res: any) => {
      this.housesCount = res.length;
    })
  }
  tenantsCount: any;
  getTenantsCount(){
      this.api.GetTenantDetails().subscribe((res: any) => {
        this.tenantsCount = res.length;
      })
  }

  userOnLis(): void {
    this.signalrService.hubConnection.on("userOn", (newUser: User) => {
      console.log(newUser);
      this.users.push(newUser);
    });
  }
  userOffLis(): void {
    this.signalrService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.id != personId);
    });
  }

  getOnlineUsersInv(): void {
    if(this.authService.isAuthenticated){
      this.signalrService.hubConnection.invoke("getOnlineUsers", localStorage.getItem('connId'))
      .catch(err => console.error(err));
    }
    
  }
  getOnlineUsersLis(): void {
    this.signalrService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<User>) => {
      this.users = [...onlineUsers];
    });
  }

  sendMsgInv(): void {
    if (this.msg?.trim() === "" || this.msg == null) return;

    this.signalrService.hubConnection.invoke("sendMsg", this.selectedUser.connId, this.msg)
    .catch(err => console.error(err));

    if (this.selectedUser.msgs == null) this.selectedUser.msgs = [];
    this.selectedUser.msgs.push(new Message(this.msg, true));
    this.msg = "";
  }

  sendMsgLis(): void {
    this.signalrService.hubConnection.on("sendMsgResponse", (connId: string, msg: string) => {
      let receiver = this.users.find(u => u.connId === connId) as any;
      if (receiver.msgs == null) receiver.msgs = [];
      receiver?.msgs.push(new Message(msg, false));
    });
  }
}
