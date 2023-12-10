import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

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
    this.authService.login(this.userName, this.password).subscribe(response => {
      const tokens = { accessToken: response.accessToken, refreshToken: response.refreshToken };
      this.authService.setTokens(tokens);

      this.router.navigate(['/MyAuctions']).then(() => {
        window.location.reload();
      });
      console.log(response);
    });
  }

}
