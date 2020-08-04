import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  query: string;

  constructor(private router: Router) {
    this.query = '';
  }

  ngOnInit() { }

  searchShows() {
    if (this.query !== '') {
      this.router.navigate(['/search-results'], { queryParams: { query: this.query } });
      this.query = '';
    } else {
      this.goToDashboard();
    }

  }

  goToDashboard() {
    this.router.navigate(['/home']);
  }

}
