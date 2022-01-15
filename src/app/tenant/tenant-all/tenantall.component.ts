import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apiservice } from '../../api.service';
import { TenantModel } from '../../models/tenant';

@Component({
  selector: 'app-tenant-all',
  templateUrl: './tenantall.component.html',
  styleUrls: ['../tenant.component.css'],
})
export class TenantAllComponent {
  subscrption: Subscription;
  constructor(public api: Apiservice, private router: Router) {}

  tenants: any;

  ngOnInit() {
    this.api.GetTenantDetails().subscribe((res) => {
      this.tenants = res;
    });

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
    this.api.deleteTenant(model).subscribe((res) => {
      this.router.navigateByUrl('tenant/add-tenant');
    });
  }

  ngDestory(){
    this.subscrption.unsubscribe();
  }
}
