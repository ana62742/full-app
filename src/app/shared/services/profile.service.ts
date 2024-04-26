import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { MS_GRAPH_URL } from 'src/app/auth/auth.config';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profilePhoto = signal<any>(null);

  constructor(private http: HttpClient) {}

  // MS Graph api can't find the photo, leave it here for now
  getProfilePhoto() {
    return this.http
      .get<any>(`${MS_GRAPH_URL}/me/photo/$value`, {
        headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
      })
      .pipe(
        tap((response) => {
          const blobUrl = window.URL.createObjectURL(response.data);
          this.addProfilePhoto(blobUrl);
          console.log({ blobUrl, response });
        })
      )
      .subscribe();
  }

  addProfilePhoto(photo: any) {
    this.profilePhoto.set(photo);
  }
}
