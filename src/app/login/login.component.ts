import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from '../api.service';
import { LoginModel } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public api : Apiservice) { }

  ngOnInit(): void {
  }

  model: any

  login(model: LoginModel){
    if(true){
      this.router.navigateByUrl('dashboard/home');
    }

    
  }

}
