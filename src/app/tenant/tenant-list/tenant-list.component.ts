import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/api.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['../tenant.component.css'],
})
export class TenantListComponent implements OnInit {

  constructor(public api: Apiservice) { }

  tenants: any

  ngOnInit() {
    this.api.GetTenantDetails().subscribe((res) => {
      this.tenants = res;
    });
  }

}
