import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnnouncementBar } from '../announcement-bar/announcement-bar';
import { HeaderAuth } from '../header-auth/header-auth';

@Component({
  selector: 'app-header',
  imports: [AnnouncementBar, RouterModule, HeaderAuth],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
