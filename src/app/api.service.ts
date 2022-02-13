import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HouseModel } from './models/house';
import { Observable, Subject } from 'rxjs';
import { TenantModel } from './models/tenant';
import { Router } from '@angular/router';
import { GlobalConstants } from './global-constants';
import { InspectionScheduleModel } from './models/inspection-schedule';
import { ToastrService } from 'ngx-toastr';
import { InspectionSubmitModel } from './models/inspection-submit';
import { ImageModel } from './models/images';
import { FeedbackModel } from './models/feedback';

@Injectable()
export class Apiservice {
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  //Create user
  postUserDetails(model: TenantModel): Observable<any> {
    return this.http.post(GlobalConstants.BaseURI + '/api/account/register', model);
  }
  //Get users
  GetUserDetails() {
    return this.http.get(GlobalConstants.BaseURI + '/api/account/get-all');
  }
  
  //View User
  viewUser(id: string) {
    // this.selectedTenant.next(model);
    return this.http.get(GlobalConstants.BaseURI + `/api/account/${id}`);
  }

  //Get UserName
  GetUserNameById(id: string){
    debugger
    return this.http.get(GlobalConstants.BaseURI + `/api/values/GetNameById/${id}`);
  }

  
  //Delete User
  deleteUser(model: TenantModel) {
    return this.http.delete(
      GlobalConstants.BaseURI + `/api/account/${model.userId}`
    );
  }
  //Update User 1
  putUserDetails(model: TenantModel) {
    this.http
      .put(GlobalConstants.BaseURI + `/api/account/${model.userId}`, model)
      .subscribe((res) => {
        this.toastr.success('Updated Successfully', 'SUCCESS');
      });
  }
  

  //Update User 2
  // putUserDetails(model: TenantModel) {
  //   return this.http.put(GlobalConstants.BaseURI + `/api/account/${model.userId}`, model)
      
  // }

  //Service for static data
  GetHouseSectionDetails() {
    return this.http.get(GlobalConstants.BaseURI + '/api/values');
  }

  //Services for Houses
  GetHouseDetails() {
    return this.http.get(GlobalConstants.BaseURI + '/api/house');
  }
  postHouseDetails(model: HouseModel) {
    return this.http
      .post(GlobalConstants.BaseURI + '/api/house', model);
      
  }
  putHouseDetails(model: HouseModel) {
    console.log(model);
     return this.http
      .put(GlobalConstants.BaseURI + `/api/house/${model.houseId}`, model);
      // .subscribe((res) => {
      //   console.log(res);
      // });
  }
 
  viewHouse(id: number) {
    // this.selectedTenant.next(model);
    return this.http.get(GlobalConstants.BaseURI + `/api/house/${id}`);
  }
  viewHouseByUserId(userId: string){
     return this.http.get(GlobalConstants.BaseURI + `/api/house/houseByUserId/${userId}`);
  }

  private selectedHouse = new Subject<any>();
  houseSelected = this.selectedHouse.asObservable();
  editHouse(model: HouseModel) {
    this.selectedHouse.next(model);
  }

  deleteHouse(model: HouseModel) {
    return this.http.delete(
      GlobalConstants.BaseURI + `/api/house/${model.houseId}`
    );
  }

  //Service for Tenants
  GetTenantDetails() {
    return this.http.get(GlobalConstants.BaseURI + '/api/tenant');
  }
  postTenantDetails(model: TenantModel): Observable<any> {
    return this.http.post(GlobalConstants.BaseURI + '/api/tenant', model);
  }
  

  private selectedTenant = new Subject<any>();
  tenantSelected = this.selectedTenant.asObservable();

  editTenant(model: TenantModel) {
    this.selectedTenant.next(model);
  }

  putTenantDetails(model: TenantModel) {
    this.http
      .put(GlobalConstants.BaseURI + `/api/tenant/${model.userId}`, model)
      .subscribe((res) => {
        console.log(res);
      });
  }

  viewTenant(id: number) {
    // this.selectedTenant.next(model);
    return this.http.get(GlobalConstants.BaseURI + `/api/tenant/${id}`);
  }

  deleteTenant(model: TenantModel) {
    return this.http.delete(
      GlobalConstants.BaseURI + `/api/tenant/${model.userId}`
    );
  }


  //Services for Inspection
  GetInspectionDetails() {
    return this.http.get(GlobalConstants.BaseURI + '/api/inspection');
  }
  private selectedInspection = new Subject<any>();
  inspectionSelected = this.selectedInspection.asObservable();
  editInspection(model: InspectionScheduleModel){
    this.selectedInspection.next(model);

  }
  postInspectionDetails(model: InspectionScheduleModel){
    return this.http.post(GlobalConstants.BaseURI + '/api/inspection', model);
  }

  putInspectionDetails(model: InspectionScheduleModel){
    return this.http.put(GlobalConstants.BaseURI + `/api/inspection/${model.inspectionScheduleId}`, model);
  }

  deleteInspection(model:  InspectionScheduleModel){
    return this.http.delete(
      GlobalConstants.BaseURI + `/api/inspection/${model.inspectionScheduleId}`
    );
  }

  viewInspection(id: number){
    return this.http.get(
      GlobalConstants.BaseURI + `/api/inspection/${id}`
    );
  }

  inspectionModel: any
  //inspectionByUserId: any
  viewInspectionByUserId(userId: string){
    //this.inspectionByUserId = userId
    this.inspectionModel = new InspectionScheduleModel();
    this.inspectionModel.userId = userId
    console.log(this.inspectionModel)
    debugger
    return this.http.get(
      GlobalConstants.BaseURI + '/api/inspection/GetByUserId', this.inspectionModel);

  }

  inspectionId: any
  viewHouseByInspectionId(id: number){
    this.inspectionId = id
    return this.http.get
    (
      GlobalConstants.BaseURI + '/api/inspection/ViewHouseByInspectionId', this.inspectionId
    );
    
  }

  //Get images submitted for inspection
  imageModel: any
  GetImagesForInspection(model: ImageModel){
    console.log(model)
    this.imageModel = model
    return this.http.get(GlobalConstants.BaseURI + '/api/house/GetImages',  this.imageModel)
    
  }


  //Post Feedback
  feedbackModel: any
  postFeedback(model: FeedbackModel){
    this.feedbackModel = model
    debugger
    return this.http.post(GlobalConstants.BaseURI + '/api/inspection/PostFeedback',  this.feedbackModel)
  }


  getMenu(id: number) {
    return this.http.get(GlobalConstants.BaseURI + `/api/Menu/GetMenuByRoleId//${id}`);
  }


  InspectionReport(){
    this.http.get(GlobalConstants.BaseURI + '/api/pdfcreator');

  }

  FeedbackReport(){
    this.http.get(GlobalConstants.BaseURI + '/api/pdfcreator');

  }







  
  



}
