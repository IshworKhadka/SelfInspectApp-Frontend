import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Authservice } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(public authService: Authservice,private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl("login");
      return false;
    }
    return true;
  }
}