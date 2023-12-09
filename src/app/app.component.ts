import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  categories : any;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {

    // Example of a POST request
    // const postData = { key: 'value' };
    // this.apiService.postData(postData).subscribe((response) => {
    //   console.log('POST response:', response);
    // });
  }
}
