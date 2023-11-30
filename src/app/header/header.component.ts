import { Component, Input } from '@angular/core';
import { ApiTimePraysService } from '../service/api-time-prays.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  time?: string;
  nextPrayer!: any;
  remainingFormTime : any = {
    hours:0,
    minutes:0,
    seconds:0
  }
  city: any

  @Input() cityInput!: any;

  constructor(private apiService:ApiTimePraysService){

  }

  updateTime(): void {
    moment.locale('ar-tn');
    this.time = moment().format('MMMM Do YYYY | hh:mm:ss ');
  }

  ngOnInit(): void {

    this.updateTime();

    setInterval(() =>{
      this.updateTime();
      this.city= localStorage.getItem("indexOfCity")?.split('-')
      this.apiService.fetchPrayerTimings(this.cityInput || this.city)
      .then((result: any[]) => {
          const [city, prays, nextPrayer, remainingFormTime] = result;
            //console.log(city);

            this.nextPrayer = nextPrayer;
            this.remainingFormTime = remainingFormTime;

      })
      .catch((error) => {
        console.error("Error occurred: ", error);
      });
    },1000)
  }

  formatNumber(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
