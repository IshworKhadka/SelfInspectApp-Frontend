import { Component } from '@angular/core';
import { Authservice } from './auth.service';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Self Inspection';

  constructor(
    public signalrService: SignalrService,
    public authService: Authservice
  ) { }


  ngOnInit() {
    this.signalrService.startConnection();
  }


  ngOnDestroy() {
    this.signalrService.hubConnection.off("askServerResponse");
  }
}
