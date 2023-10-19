import { Component } from '@angular/core';
import { UploadedEvent } from 'devextreme/ui/file_uploader';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private userService: UserService) {}
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
}
