import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 isLoading = false;
emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onSignUp(form: NgForm) {

    if (form.valid) {
      this.isLoading = true;
      this.authService.signUpUser(form.value.email, form.value.password, form.value.username)
      .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }, error => {
      });
    }

  }
}
