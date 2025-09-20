import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth-service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  const router = inject(Router);

  return _authService.getIsUserLogged().pipe(
    tap((isLogged) => {
      if (!isLogged) {
        router.navigateByUrl('/login');
      }
    })
  );
};
