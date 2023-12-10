import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router, private authService : AuthService) {}

  isButtonDisabled: boolean = true;
  userName!: string;
  email!: string;
  password!: string;

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/MyAuctions']);
    }
  }

  onSubmit() {

    const userData = {
      userName: this.userName,
      email: this.email,
      password: this.password
    };

    this.apiService.register(userData).subscribe((data) => {
      console.log('Received data:', data);
    });

    this.router.navigate(['/Login']);
  }

  updateButtonState() {
    if(this.userName != null && this.password != null && this.email != null && this.userName.length != 0 && this.password.length != 0 && this.email.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }
}
