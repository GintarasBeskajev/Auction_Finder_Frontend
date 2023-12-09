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

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/Profile']);
    }
  }

  userName!: string;
  password!: string;
  authenticated: boolean = false;

  onSubmit() {
    this.authService.login(this.userName, this.password).subscribe(response => {
      const tokens = { access_token: response.accessToken, refresh_token: response.refreshToken };
      this.authService.setTokens(tokens);

      window.location.reload();
      this.router.navigate(['/Profile']).then(() => {
        window.location.reload();
      });
    });
  }

}
