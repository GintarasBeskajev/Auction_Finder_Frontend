import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/Login']);
    }
  }
}
