import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { catchError, from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn = false;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  register(params: SignIn) {
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
  );
  }
  
  logout() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['/auth']);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    if ( code === "auth/invalid-login-credentials") {
      return "Invalid login credentials.";
    }
    return message;
  }

}

type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};