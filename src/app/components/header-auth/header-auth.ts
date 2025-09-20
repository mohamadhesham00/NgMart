import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'app/services/auth-service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header-auth',
  imports: [RouterModule, MenuModule, ButtonModule, RouterModule],
  templateUrl: './header-auth.html',
  styleUrl: './header-auth.css',
})
export class HeaderAuth {
  items: MenuItem[] | undefined;
  isUserLogged!: boolean;
  /**
   *
   */
  constructor(private _authService: AuthService) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'View Profile',
            icon: 'pi pi-user',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this._authService.logout();
            },
          },
        ],
      },
    ];
    this._authService.getIsUserLogged().subscribe((isLogged) => {
      this.isUserLogged = isLogged;
    });
  }
}
