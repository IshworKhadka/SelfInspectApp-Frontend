import { Component, OnInit } from '@angular/core';
import { Apiservice } from '../api.service';
import { Authservice } from '../auth.service';
import { Message, SignalrService, User } from '../signalr.service';
import { HouseModel } from '../models/house';
import { InspectionScheduleModel } from '../models/inspection-schedule';
import { TenantModel } from '../models/tenant';
import { InspectionScheduleViewModel } from '../models/view-model/inspection-schedule-viewmodel'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api: Apiservice,
    public authService: Authservice,
    public signalrService: SignalrService) {
    
   }

  users: Array<User> = new Array<User>();
  selectedUser: User;
  msg: string;
  connId : string;
  userId : string;
  roleId: any

  inspection_schedules: any
  inspection_scheules_viewmodel: InspectionScheduleViewModel[] = []
  inspection_schedules_tenant: InspectionScheduleModel[] = []
  inspection_schedules_tenant_viewmodel : InspectionScheduleViewModel[] = []
  house: HouseModel
  name: string
  user = localStorage.getItem('user')

  ngOnInit(): void {
    this.roleId = localStorage.getItem('role');
    this.getHousesCount();
    this.getTenantsCount();
    this.getInspectionMonthlyCount();


    this.api.GetInspectionDetails().subscribe(res => {
      //For Admin Reminder
      this.inspection_schedules = res;

      //For Tenant Reminder, push to its viewmodel array
      this.inspection_schedules.forEach((element: any) => {
        if(element.userId == this.user){
          this.inspection_schedules_tenant_viewmodel.push(element)
        }
      });

      //Push for admin viewmodel 
      this.inspection_schedules.forEach((element: any) => {
          this.inspection_scheules_viewmodel.push(element)
      });

      // //create house address from houseid
      // this.inspection_scheules_viewmodel.forEach(element => {
      //   this.api.viewHouse(element.houseId).subscribe((res: any) => {
      //     this.house = res
      //     element.house_address = this.house.house_number + " " + this.house.street + ", " + this.house.suburb
      //   })
      //   this.api.GetUserNameById(element.userId).subscribe((res: any) => {
      //     debugger
      //     this.name = res
      //     element.user_name =  this.name

      //   })
        
      // })

      // this.inspection_schedules_tenant_viewmodel.forEach(element => {
      //   this.api.viewHouse(element.houseId).subscribe((res: any) => {
      //     this.house = res
      //     element.house_address = this.house.house_number + " " + this.house.street + ", " + this.house.suburb
      //   })
      // });
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
      .catch((err: any) => console.error(err));
    }
    
  }
  getOnlineUsersLis(): void {
    this.signalrService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<User>) => {
      this.users = [...onlineUsers];
    });
  }

  sendMsgInv(): void {
    if (this.msg?.trim() === "" || this.msg == null) return;

    this.signalrService.hubConnection.invoke("sendMsg", localStorage.getItem('connId'), this.selectedUser.connId, this.msg)
    .catch(err => console.error(err));

    if (this.selectedUser.msgs == null) this.selectedUser.msgs = [];
    this.selectedUser.msgs.push(new Message(this.msg, true));
    this.msg = "";
  }

  sendMsgLis(): void {
    this.signalrService.hubConnection.on("sendMsgResponseCon", (msgData: any) => {
      let receiver = this.users.find(u => u.connId === msgData.fromConnId) as any;
      if(msgData.toConnId == localStorage.getItem('connId')){
        if (receiver.msgs == null) receiver.msgs = [];
        receiver?.msgs.push(new Message(msgData.msg, false));
      }
    });
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
      this.api.GetUserDetails().subscribe((res: any) => {
        this.tenantsCount = res.length;
      })
  }

  inspectionList: any
  inspectionMonthlyCount: any
  pendingMonthlyInspectionsCount: any
  totalInspectionsCount: any
  
  getInspectionMonthlyCount(){
    this.inspectionMonthlyCount = 8
    this.pendingMonthlyInspectionsCount = 5
    let currentMonth = new Date().getMonth() + 1
    let currentYear = new Date().getFullYear()
    this.api.GetInspectionDetails().subscribe((res: any) => {
      this.inspection_scheules_viewmodel = res;
      this.inspectionList = res
      this.totalInspectionsCount = res.length;

      for (let index = 0; index < this.inspectionList.length; index++) {
        debugger
        let inspectionYear = (this.inspectionList[index].inspection_date).getFullYear 
        let inspectionMonth = (this.inspectionList[index].inspection_date).getMonth() + 1 
        
        if(inspectionYear == currentYear && inspectionMonth == currentMonth){
          this.inspectionMonthlyCount = this.inspectionMonthlyCount = 1
        }
        
      }

    })
  }
  

}
