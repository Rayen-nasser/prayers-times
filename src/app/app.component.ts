import { Component, Input } from '@angular/core';
import { ApiTimePraysService } from './service/api-time-prays.service';
import { Pray } from './model/pray';
import * as moment from 'moment';
import { NavigationEnd, Route, Router } from '@angular/router';
import { ListPraysComponent } from './list-prays/list-prays.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Time Of Prays';
  selectedCity: any = '';

  showButton: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL matches any route where the button should be hidden
        this.showButton = !this.isButtonHiddenRoute(this.router.url);
      }
    });
  }

  // Method to determine if the button should be hidden for the current route
  isButtonHiddenRoute(url: string): boolean {
    const routesToHideButton = ['/listOfPrayers', 'athkarAfterPray']; // Add more routes if needed
    return routesToHideButton.some((route) => url.includes(route));
  }

  toggleButton() {
    this.showButton = !this.showButton;
  }

  handleCityChange(city: any) {
    this.selectedCity = city;
  }

  ngOnInit(): void {}
}
