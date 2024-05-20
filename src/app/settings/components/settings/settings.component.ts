import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadedEvent } from 'devextreme/ui/file_uploader';
import { Subscription, catchError, tap, throwError } from 'rxjs';
import { MS_GRAPH_URL } from 'src/app/auth/auth.config';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  response = null;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.getList();
  }

  getList() {
    this.subscription = this.http
      .get<any>(
        `${MS_GRAPH_URL}/sites/everisgroup-my.sharepoint.com/sites/ASETechnicalCommunity`
      )
      .pipe(
        catchError(({ error }) => {
          this.response = error.error.message;
          const err = new Error(error.error.message);

          return throwError(() => err);
        }),
        tap((response) => {
          this.response = response;
        })
      )
      .subscribe();
  }

  onUploaded(e: UploadedEvent) {
    const obj = JSON.parse(e.request.response);
    const result = obj.map((item: any) => {
      return {
        ...item,
        id: parseInt(item.id),
        skills: item.skills.split(', '),
      };
    });
    this.userService.overrideUsers(result);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
