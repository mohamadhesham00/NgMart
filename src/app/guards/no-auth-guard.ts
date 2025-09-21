import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth-service';
import { map, tap } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getIsUserLogged().pipe(
    map((isLogged) => !isLogged), // invert: allow only if NOT logged in
    tap((canActivate) => {
      if (!canActivate) {
        router.navigateByUrl('/'); // redirect to home or dashboard
      }
    })
  );
};
