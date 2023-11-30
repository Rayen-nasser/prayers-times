import { Component, OnInit } from '@angular/core';
import { ApiAthkarAfterPrayService } from '../service/api-athkar-after-pray.service';
import { Adkar } from '../model/adkar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athkar-after-pray',
  templateUrl: './athkar-after-pray.component.html',
  styleUrls: ['./athkar-after-pray.component.css'],
})
export class AthkarAfterPrayComponent implements OnInit {
  adkar: Adkar[] = [];
  currentIndex = 0;
  count = 0;

  constructor(private apiService: ApiAthkarAfterPrayService, private router: Router) {}

  ngOnInit() {
    this.apiService.getAthkar().subscribe(
      (data) => {
        //console.log('Fetched data:', data.after_prayer.length);
        this.adkar = data.after_prayer;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  displayNext() {
    if (this.count + 1 == this.adkar[this.currentIndex].count) {
      setTimeout(() => {
        this.count = 0;
        this.currentIndex = (this.currentIndex + 1) % this.adkar.length;
      }, 500);
    }

    //console.log(this.currentIndex);

    if(this.adkar.length - 1 === this.currentIndex){
      this.router.navigate(['listOfPrayers']);
    }
    this.count++;
  }
}
