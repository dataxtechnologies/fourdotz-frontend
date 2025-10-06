import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('authToken');
  const userType = sessionStorage.getItem('user_type');

  // If no token → go to login
  if (!token) {
    sessionStorage.clear();
    router.navigate(['/auth/sign-in']);
    return false;
  }

  // If logged in, check user type and redirect if needed
  switch (userType) {
    case 'super_admin':
      if (!state.url.startsWith('/Superadmin')) {
        router.navigate(['/Superadmin/Dashboard']);
        return false;
      }
      break;

    case 'hoa_admin':
      if (!state.url.startsWith('/Association')) {
        router.navigate(['/Association/Dashboard']);
        return false;
      }
      break;

    case 'owner':
      if (!state.url.startsWith('/Owner')) {
        router.navigate(['/Owner/Dashboard']);
        return false;
      }
      break;

    case 'tenant':
      if (!state.url.startsWith('/Tenant')) {
        router.navigate(['/Tenant/Dashboard']);
        return false;
      }
      break;

    default:
      // sessionStorage.clear();
      // router.navigate(['/auth/sign-in']);
      return false;
  }

  return true;
};
