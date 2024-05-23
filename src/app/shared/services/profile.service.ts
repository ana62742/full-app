import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { MS_GRAPH_URL } from 'src/app/auth/auth.config';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilePhoto = signal<string>('');

  constructor(private http: HttpClient) {}

  // MS Graph api can't find the photo, leave it here for now
  getProfilePhoto() {
    return this.http
      .get<any>(`${MS_GRAPH_URL}/me/photo/$value`, {
        headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
        tap((response) => {
          const blobUrl = window.URL.createObjectURL(response.data);
          this.addProfilePhoto(blobUrl);

          console.log('image: ', { blobUrl, response });
        })
      )
      .subscribe();
  }

  addProfilePhoto(photo: string) {
    this.profilePhoto.set(photo);
  }
}
