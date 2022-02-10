import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authservice } from '../auth.service';
import { LoginModel } from '../models/login';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [SignalrService]
})
export class LoginComponent {

  form

  model: LoginModel

  constructor(private router: Router, public auth: Authservice, private fb: FormBuilder,
    public signalrService: SignalrService
  ) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    //this.signalrService.startConnection();

    this.auth.authMeListenerSuccess();
    this.auth.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("authMeResponseSuccess");
    this.signalrService.hubConnection.off("authMeResponseFail");
  }

  login(model: any) {
    this.auth.login(this.form.value);
    this.auth.authMe(this.form.value);
  }

}
