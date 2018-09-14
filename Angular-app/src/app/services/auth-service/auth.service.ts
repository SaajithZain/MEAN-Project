import { Injectable } from '@angular/core';
import { AuthModel } from '../../authentication/auth-model/auth-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginComponent } from '../../authentication/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string;
  private authStaus = false;
  private authToken: string;
  private authListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(email: string, password: string, username: string) {
    const userAuthData: AuthModel = {email: email, password: password, username: username};
     return this.http.post(environment.apiEndpointUrl + 'user/signup', userAuthData);
  }


  loginUser(email: string, password: string) {
    const userAuthData = {email: email, password: password};
      this.http.post<any>(environment.apiEndpointUrl + 'user/login', userAuthData)
        .subscribe(responseData => {
          if (responseData.token) {
          this.userId = responseData.userId;
          this.setLocalStorage(responseData.token, responseData.userId);
          this.authListener.next(true);
          this.authStaus = true;

        }

        this.router.navigate(['/posts']);
  }, error => {

    }
  );
  }

  logout() {
    this.clearLocalStorage();
    this.authListener.next(false);
    this.authStaus = false;
  }

  setLocalStorage(token: string, id: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id );
  }

  clearLocalStorage() {
    localStorage.setItem('token', '' );
    localStorage.setItem('userId', '');
  }

  getAuthStateListener() {
    return this.authListener.asObservable();
  }
 // returns true/false reading token saved in local storages
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token == null || token === '') {
      return false;
    }
   return true;
  }

  // return authentication status if true/false
  getAuthStatus() {
    return this.authStaus;
  }

  // get logged user Id
  getUserId() {
    return { userId: this.userId };
  }
}
