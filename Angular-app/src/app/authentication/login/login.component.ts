import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
   if (form.valid) {
    this.authService.loginUser(form.value.email, form.value.password);
  }
  }
}
