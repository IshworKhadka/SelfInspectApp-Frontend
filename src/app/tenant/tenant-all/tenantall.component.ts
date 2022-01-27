import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Authservice } from 'src/app/auth.service';
import { Apiservice } from '../../api.service';
import { TenantModel } from '../../models/tenant';

@Component({
  selector: 'app-tenant-all',
  templateUrl: './tenantall.component.html',
  styleUrls: ['../tenant.component.css'],
})
export class TenantAllComponent {
  subscrption: Subscription;
  constructor(public api: Apiservice, private auth: Authservice, private router: Router, private toastr: ToastrService) {}

  tenants: any;
  
  ngOnInit() {
    this.api.GetUserDetails().subscribe((res) => {
      this.tenants = res;
      console.log(this.tenants)
    });
    //GetTenantDetails

    // this.subscrption.add(
    //   this.dialogRef.subscribe(
    //     res =>{
    //       if(res && res.reloadGrid == true){
    //         this.api.GetTenantDetails().subscribe((res) => {
    //           this.tenants = res;
    //         });
    //       }
    //     }
    //   )
    // )

  }

  delete(model: TenantModel) {
    this.api.deleteUser(model).subscribe((res) => {
      this.router.navigateByUrl('tenant/add-tenant');
    });
  }

  inviteUser(userId: string){
    this.auth.inviteUser(userId).subscribe((res: any) => {
      this.toastr.success("Invitation link sent", "SUCCESS");
    });
  }

  ngDestory(){
    this.subscrption.unsubscribe();
  }
}
