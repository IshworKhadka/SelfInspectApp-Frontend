import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { Apiservice } from './api.service';
import { Authservice } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { SignalrService } from './signalr.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HouseComponent } from './house/house-add/house.component';
import { HouseAllComponent } from './house/house-all/houseall.component';
import { HouseViewComponent } from './house/house-view/houseview.component';
import { BedroomComponent } from './house/house-view/sections/bedroom/bedroom.component';
import { KitchenComponent } from './house/house-view/sections/kitchen/kitchen.component';
import { HallComponent } from './house/house-view/sections/hall/hall.component';
import { BathroomComponent } from './house/house-view/sections/bathroom/bathroom.component';
import { HouseAboutComponent } from './house/house-view/sections/house-about/house-about.component';
import { HouseDetailsComponent } from './house/house-view/sections/house-details/house-details.component';
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
import { BedroomSubmitComponent } from './inspection/inspection-submit/sections/bedroom/bedroom.component';
import { KitchenSubmitComponent } from './inspection/inspection-submit/sections/kitchen/kitchen.component';
import { HallSubmitComponent } from './inspection/inspection-submit/sections/hall/hall.component';
import { BathroomSubmitComponent } from './inspection/inspection-submit/sections/bathroom/bathroom.component';

import { InspectionViewComponent } from './inspection/inspect-house/inspection-view/inspection-view.component';
import { BedroomInspectionViewComponent } from './inspection/inspect-house/inspection-view/sections/bedroom/bedroom.component';
import { KitchenInspectionViewComponent } from './inspection/inspect-house/inspection-view/sections/kitchen/kitchen.component';
import { HallInspectionViewComponent } from './inspection/inspect-house/inspection-view/sections/hall/hall.component';
import { BathroomInspectionViewComponent } from './inspection/inspect-house/inspection-view/sections/bathroom/bathroom.component';


import { AddReminderComponent } from './add-reminder/add-reminder.component';
import { RegisterComponent } from './register/register.component';
import { HouseListComponent } from './house/house-list/house-list.component';

import { TenantProfileComponent } from './tenant-profile/tenant-profile.component';
import { InspectionFeedbackComponent } from './inspection/inspect-house/inspection-view/inspection-feedback/inspection-feedback.component';

const appRoutes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'house', component: HeaderComponent,
    children: [
      {path: 'add-house', component: HouseComponent},
      {path: 'view-all', component: AboutComponent},
      {path: 'view-list', component: HouseListComponent},
      {path: 'view-house/:id', component: HouseViewComponent,
        children: [
          {path: "", redirectTo: "house-details", pathMatch: "full"},
          {path: "kitchen", component: KitchenComponent},
          {path: "bathroom", component: BathroomComponent},
          {path: "bedroom", component: BedroomComponent},
          {path: "hall", component: HallComponent},
          {path: "house-details", component: HouseDetailsComponent}
        ]
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'tenant', component: HeaderComponent,
    children: [
      {path: 'add-tenant', component: TenantComponent},
      {path: 'view-all', component: TenantAllComponent},
      {path: 'view-list', component: TenantListComponent},
      {path: 'view-tenant/:id', component: TenantViewComponent},
      {path: 'view-profile', component: TenantProfileComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'inspection', component: HeaderComponent,
    children: [
      {path: 'add-inspection', component: AddScheduleComponent},
      {path: 'inspect-house', component: InspectHouseComponent},
      {path: 'inspect-view/:id', component: InspectionViewComponent,
      children: [
        {path: "", redirectTo: "bedroom", pathMatch: "full"},
        {path: "kitchen", component: KitchenInspectionViewComponent},
        {path: "bathroom", component: BathroomInspectionViewComponent},
        {path: "bedroom", component: BedroomInspectionViewComponent},
        {path: "hall", component: HallInspectionViewComponent}
      ]
    }, 
      {path: 'inspect-submit', component: InspectionSubmitComponent,
        children: [
          {path: "", redirectTo: "kitchen", pathMatch: "full"},
          {path: "kitchen", component: KitchenSubmitComponent},
          {path: "bathroom", component: BathroomSubmitComponent},
          {path: "bedroom", component: BedroomSubmitComponent},
          {path: "hall", component: HallSubmitComponent}
        ]
    }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component:  LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '**', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent, 
    LoginComponent, RegisterComponent,
    HeaderComponent,
    HomeComponent, AboutComponent,
    HouseComponent, HouseAllComponent, HouseViewComponent, HouseListComponent,
    BedroomComponent, KitchenComponent, HallComponent, BathroomComponent, HouseAboutComponent, HouseDetailsComponent,
    BedroomSubmitComponent, KitchenSubmitComponent, HallSubmitComponent, BathroomSubmitComponent,
    TenantComponent, TenantAllComponent, TenantViewComponent, TenantListComponent,
    TenantProfileComponent,
    AddScheduleComponent, ScheduleAllComponent, InspectHouseComponent, InspectionSubmitComponent,
    AddReminderComponent, 
    InspectionViewComponent, BedroomInspectionViewComponent, KitchenInspectionViewComponent,
    HallInspectionViewComponent, BathroomInspectionViewComponent, InspectionFeedbackComponent
   
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, 
    HttpClientModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule, 
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [Apiservice, SignalrService, Authservice, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
