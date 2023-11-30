import { Component, Input, SimpleChange } from '@angular/core';
import { ApiTimePraysService } from '../service/api-time-prays.service';
import { Pray } from '../model/pray';
import { LoadingService } from '../service/loading.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-list-prays',
  templateUrl: './list-prays.component.html',
  styleUrls: ['./list-prays.component.css'],
})
export class ListPraysComponent {
  @Input() praysData: Pray[] = [];
  isLoading$: Observable<boolean>;

  constructor(private apiService: ApiTimePraysService,private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.isLoading;
  }

  prays: Pray[] = [];
  city!: any

  ngOnInit(): void {


    this.loadingService.show()
    setInterval(()=>{
      this.city= localStorage.getItem("indexOfCity")?.split('-')
      this.apiService.fetchPrayerTimings(this.city[1])
    .then((result: any[]) => {
      const [city,prays, nextPrayer, remainingFormTime] = result;

      this.prays = prays;
      let makeFajr = false;

      for (let pray of prays) {
        if (pray.isNext) {
          makeFajr = true;
          break;
        }
      }

      if (!makeFajr) {
        this.prays = prays.map((pray: { name: string, isNext: boolean }) => {
          if (pray.name === "الفجر") {
            pray.isNext = true;
          }
          return pray;
        });
      }

      this.loadingService.hide()
      //console.log(this.prays);

    })
    .catch((error) => {
      this.loadingService.hide();
      console.error("Error occurred: ", error);
    });
    },1000)
  }


}
