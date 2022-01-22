import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { Apiservice } from './api.service';
import { Authservice } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HouseComponent } from './house/house-add/house.component';
import { HouseAllComponent } from './house/house-all/houseall.component';
import { HouseViewComponent } from './house/house-view/houseview.component';
import { TenantComponent } from './tenant/tenant-add/tenant.component';
import { TenantAllComponent } from './tenant/tenant-all/tenantall.component';
import { TenantViewComponent } from './tenant/tenant-view/tenantview.component';
import { TenantListComponent } from './tenant/tenant-list/tenant-list.component';
import { AddScheduleComponent } from './inspection/add-schedule/add-schedule.component';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { ScheduleAllComponent } from './inspection/schedule-all/schedule-all.component';
import { InspectHouseComponent } from './inspection/inspect-house/inspect-house.component';
import { InspectionSubmitComponent } from './inspection/inspection-submit/inspection-submit.component';
import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
    ]
  },
  {
    path: 'house', component: HeaderComponent,
    children: [
      {path: 'add-house', component: HouseComponent},
      {path: 'view-all', component: AboutComponent},
      {path: 'view-house/:id', component: HouseViewComponent},
    ]
  },
  {
    path: 'tenant', component: HeaderComponent,
    children: [
      {path: 'add-tenant', component: TenantComponent},
      {path: 'view-all', component: TenantAllComponent},
      {path: 'view-list', component: TenantListComponent},
      {path: 'view-tenant/:id', component: TenantViewComponent},
    ]
  },
  {
    path: 'inspection', component: HeaderComponent,
    children: [
      {path: 'add-inspection', component: AddScheduleComponent},
      {path: 'inspect-house', component: InspectHouseComponent}, 
      {path: 'inspect-submit', component: InspectionSubmitComponent}
    ]
  },
  {
    path: 'login', component:  LoginComponent
  },
  {
    path: '**', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent,
    HeaderComponent,
    HomeComponent, AboutComponent,
    HouseComponent, HouseAllComponent, HouseViewComponent,
    TenantComponent, TenantAllComponent, TenantViewComponent, TenantListComponent,
    AddScheduleComponent, ScheduleAllComponent, InspectHouseComponent, InspectionSubmitComponent, AddReminderComponent, RegisterComponent
    
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    HttpClientModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule, RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [Apiservice, Authservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
