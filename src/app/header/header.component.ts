import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from '../api.service';
import { Authservice } from '../auth.service';
import { UserStore } from '../user-store.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userStore: UserStore = new UserStore();
  menuList : any;
  roleId: any;
  constructor( public router : Router, public api : Apiservice, private auth: Authservice) {
    
    
   }

  ngOnInit(): void {
    this.getHousesCount();
    this.getTenantsCount();
    this.roleId = localStorage.getItem('role');
    let role: number = localStorage.getItem('role') as any;                     
      this.api.getMenu(role)
        .subscribe((res: any) => {
          this.menuList = res;
          console.log(this.menuList)
        }
      )
  }

  redirectToHome(){
    this.router.navigateByUrl('dashboard/home');
  }

  redirectToAbout(){
    this.router.navigateByUrl('dashboard/about');
  }

  logOut(){
    this.auth.logout();
  }

  redirectToAddHouse(){
    this.router.navigateByUrl('house/add-house');
  }

  redirectToAddTenant(){
    this.router.navigateByUrl('tenant/add-tenant');
  }
  redirectToScheduleInspection(){
    this.router.navigateByUrl('inspection/add-inspection');
  }
  redirectToInspectHouse(){
    this.router.navigateByUrl('inspection/inspect-house');
  }
  redirectToInspectSubmit(){
    this.router.navigateByUrl('inspection/inspect-submit');
  }

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

  redirectToViewAllTenant(){
    this.router.navigateByUrl('tenant/view-list');
  }

  redirectToViewAllHouse(){
    this.router.navigateByUrl('house/view-list');
  }

  


}
