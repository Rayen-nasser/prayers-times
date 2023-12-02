import { Component, Input, SimpleChange } from '@angular/core';
import { ApiTimePraysService } from '../service/api-time-prays.service';
import { Pray } from '../model/pray';
import { LoadingService } from '../service/loading.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-prays',
  templateUrl: './list-prays.component.html',
  styleUrls: ['./list-prays.component.css'],
})
export class ListPraysComponent {
  @Input() praysData: Pray[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private apiService: ApiTimePraysService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.isLoading$ = this.loadingService.isLoading;
  }

  prays: Pray[] = [];
  city!: any;

  ngOnInit(): void {
    this.loadingService.show();
    setInterval(() => {
      this.city = localStorage.getItem('indexOfCity')?.split('-');
      this.apiService
        .fetchPrayerTimings(this.city[1])
        .then((result: any[]) => {
          const [city, prays, nextPrayer, remainingFormTime] = result;

          this.prays = prays;
          let makeFajr = false;

          const currentTime = moment().format('HH:mm:ss'); // Get the current time with seconds

          for (let pray of prays) {
            if (pray.isNext) {
              makeFajr = true;
              break;
            }

            const prayTime = moment(pray.time, 'HH:mm:ss');
            const time_Adkar_After_Pray = moment(pray.time, 'HH:mm:ss').add(
              18,
              'minutes'
            );

            const targetPrayTime = prayTime.format('HH:mm:ss');
            const targetAdkarTime = time_Adkar_After_Pray.format('HH:mm:ss');

            if (currentTime === targetPrayTime) {
              const audio = new Audio('../../assets/mp3/adanNacer.mp3');
              audio.play();
              console.log('dgdg');
            }

            if (currentTime === targetAdkarTime) {
              this.router.navigate(['athkarAfterPray']);
            }
          }

          if (!makeFajr) {
            this.prays = prays.map(
              (pray: { name: string; isNext: boolean }) => {
                if (pray.name === 'الفجر') {
                  pray.isNext = true;
                }
                return pray;
              }
            );
          }

          this.loadingService.hide();
          //console.log(this.prays);
        })
        .catch((error) => {
          this.loadingService.hide();
          console.error('Error occurred: ', error);
        });
    }, 1000);
  }
}
