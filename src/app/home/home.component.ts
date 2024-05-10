import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [FormsModule, NavbarComponent]
})
export class HomeComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  search() {
    if (this.searchTerm) {
      this.router.navigate(['/search', { query: this.searchTerm }]);
    }
  }
}
