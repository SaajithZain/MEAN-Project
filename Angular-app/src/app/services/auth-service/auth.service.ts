import { Injectable } from '@angular/core';
import { AuthModel } from '../../authentication/auth-model/auth-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStaus = false;
  private authToken: string;
  private authListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(email: string, password: string) {
    const userAuthData: AuthModel = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', userAuthData).subscribe(responseData => {
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
    });
  }

  loginUser(email: string, password: string) {
    const userAuthData: AuthModel = {email: email, password: password};
    this.http.post<any>('http://localhost:3000/api/user/login', userAuthData)
    .subscribe(responseData => {
      if(responseData.token) {

      this.setLocalStorage(responseData.token);
      this.authListener.next(true);
      this.authStaus = true;
      }
     this.router.navigate(['/posts']);
  }, error => {
      console.log(error);
    });
  }

  logout() {

    localStorage.setItem('token', '' );
    this.authListener.next(false);
  }

  setLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getAuthStateListener() {
    return this.authListener.asObservable();
  }

  setAuthState(state: boolean) {
    this.authListener.next(state);
    this.authStaus = state;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if( token == null || token === '') {
      return false;
    }
   return true;
  }

  getAuthStatus() {
    return this.authStaus;
  }
}
