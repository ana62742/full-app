import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((user) => {
        if (user) {
          // console.log(user?.email);
          return true;
        } else {
          // console.log('not logged in');
          this.router.navigate(['/auth']); 
          return false; 
        }
      })
    );
  }
}
