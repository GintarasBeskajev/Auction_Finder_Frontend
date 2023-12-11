import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

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

    // const userData = {
    //   userName: this.userName,
    //   email: this.email,
    //   password: this.password
    // };

    // this.apiService.register(userData).subscribe((data) => {
    //   console.log('Received data:', data);
    // });

    this.authService.register(this.userName, this.email, this.password).subscribe(
      (data) => {
        this.router.navigate(['/Login']);
      },
      (error) => {
        if(error.status === 400){
          this.snackBar.open("Registration failed", "Close", {
            panelClass: 'success-snackbar',
            duration: 2000,
            horizontalPosition: 'end',
          });
        }
      }
    );
  }

  updateButtonState() {
    if(this.userName != null && this.password != null && this.email != null && this.userName.length != 0 && this.password.length != 0 && this.email.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }
}
