import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private postSubscription: Subscription;

  constructor(private authService: AuthService) { }
  loggedIn = false;
  ngOnInit() {
    this.loggedIn = this.authService.getAuthStatus();
    this.postSubscription =  this.authService.getAuthStateListener().subscribe(value => {
      this.loggedIn = value;
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
