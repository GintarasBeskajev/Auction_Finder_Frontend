import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit  {
  isButtonDisabled: boolean = true;
  userName!: string;
  password!: string;
  authenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private updateService: UpdateService) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/MyAuctions']);
    }

    this.updateButtonState();
  }

  updateButtonState() {
    if(this.userName != null && this.password != null && this.userName.length != 0 && this.password.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onSubmit() {
    this.authService.login(this.userName, this.password).subscribe(
      (data) => {
        const tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
        this.authService.setTokens(tokens);
        this.updateService.triggerHeaderUpdate();
        this.router.navigate(['/MyAuctions']);
      },
      (error) => {
        if(error.status === 400){
          this.toastr.error('Wrong username or password');
        }
      }
    );
  }

}

