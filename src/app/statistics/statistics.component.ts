import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent {
  constructor(private router: Router) { }

  navigateToGeneralStatistics() {
    this.router.navigate(['/general-statistics']);
  }

  navigateToProjectStatistics() {
    this.router.navigate(['/project-statistics']);
  }
}
