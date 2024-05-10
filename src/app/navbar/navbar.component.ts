import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  goHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  goSearch(event: Event) {
    event.preventDefault();
    this.router.navigate(['/search']).then(() => {
      window.location.reload();
    });
  }

  goFavorites(event: Event) {
    event.preventDefault();
    this.router.navigate(['/favorites']).then(() => {
      window.location.reload();
    });
  }
}
