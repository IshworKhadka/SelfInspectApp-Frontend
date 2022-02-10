import { Component, OnInit, OnDestroy } from '@angular/core';
import { Authservice } from './auth.service';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SignalrService]
})
export class AppComponent implements OnInit, OnDestroy {
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
