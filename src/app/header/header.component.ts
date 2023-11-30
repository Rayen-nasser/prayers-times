import { Component, Input } from '@angular/core';
import { ApiTimePraysService } from '../service/api-time-prays.service';
import * as moment from 'moment';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  time?: string;
  nextPrayer!: any;
  remainingFormTime: any = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  city: any;

  @Input() cityInput!: any;

  showButton: boolean = true;

  constructor(private apiService: ApiTimePraysService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL matches any route where the button should be hidden
        this.showButton = !this.isButtonHiddenRoute(this.router.url);
      }
    });
  }

  // Method to determine if the button should be hidden for the current route
  isButtonHiddenRoute(url: string): boolean {
    const routesToHideButton = ['athkarAfterPray']; // Add more routes if needed
    return routesToHideButton.some((route) => url.includes(route));
  }

  toggleButton() {
    this.showButton = !this.showButton;
  }

  updateTime(): void {
    moment.locale('ar-tn');
    this.time = moment().format('MMMM Do YYYY | hh:mm:ss ');
  }

  ngOnInit(): void {
    this.updateTime();

    setInterval(() => {
      this.updateTime();
      this.city = localStorage.getItem('indexOfCity')?.split('-');
      this.apiService
        .fetchPrayerTimings(this.cityInput || this.city)
        .then((result: any[]) => {
          const [city, prays, nextPrayer, remainingFormTime] = result;
          //console.log(city);

          this.nextPrayer = nextPrayer;
          this.remainingFormTime = remainingFormTime;
        })
        .catch((error) => {
          console.error('Error occurred: ', error);
        });
    }, 1000);
  }

  formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
