import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private api : ApiService
  ) {}

  isLoggedIn() {
    return this.api.isLoggedIn();
  }
}
