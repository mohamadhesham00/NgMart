import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AnnouncementBar } from '../announcement-bar/announcement-bar';
import { HeaderAuth } from '../header-auth/header-auth';

@Component({
  selector: 'app-header',
  imports: [AnnouncementBar, RouterModule, HeaderAuth, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false;
  searchTerm: string = '';
  /**
   *
   */
  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { q: this.searchTerm },
      });
    }
  }
}
