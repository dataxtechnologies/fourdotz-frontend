import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');
  const userType = localStorage.getItem('user_type');

  // 1️⃣ If user has token and visits sign-in → redirect to dashboard
  if (token && state.url === '/auth/sign-in') {
    switch (userType) {
      case 'superadmin':
        router.navigate(['/Superadmin/Dashboard']);
        return false;
      case 'association':
        router.navigate(['/Association/Dashboard']);
        return false;
      case 'owner':
        router.navigate(['/Owner/Dashboard']);
        return false;
      case 'tenant':
        router.navigate(['/Tenant/Dashboard']);
        return false;
      default:
        localStorage.clear();
        router.navigate(['/auth/sign-in']);
        return false;
    }
  }

  // 2️⃣ If user has NO token → only allow auth pages
  if (!token) {
    if (state.url.startsWith('/auth')) {
      return true; // allow sign-in, forget-password, etc.
    }
    localStorage.clear();
    router.navigate(['/auth/sign-in']);
    return false;
  }

  // 3️⃣ Authenticated users accessing other routes
  switch (userType) {
    case 'superadmin':
      if (!state.url.startsWith('/Superadmin')) {
        router.navigate(['/Superadmin/Dashboard']);
        return false;
      }
      break;

    case 'association':
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
      localStorage.clear();
      router.navigate(['/auth/sign-in']);
      return false;
  }

  return true;
};
