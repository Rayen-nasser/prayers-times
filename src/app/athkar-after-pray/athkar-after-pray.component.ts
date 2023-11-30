import { Component, OnInit } from '@angular/core';
import { ApiAthkarAfterPrayService } from '../service/api-athkar-after-pray.service';
import { Adkar } from '../model/adkar';

@Component({
selector: 'app-athkar-after-pray',
  templateUrl: './athkar-after-pray.component.html',
  styleUrls: ['./athkar-after-pray.component.css']
})
export class AthkarAfterPrayComponent implements OnInit {
  adkar: Adkar[] = [];
  currentIndex = 0;
  count = 0

  constructor(private apiService: ApiAthkarAfterPrayService) { }

  ngOnInit() {
    this.apiService.getAthkar().subscribe(
      (data) => {
        console.log('Fetched data:', data.after_prayer);
        this.adkar = data.after_prayer;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  displayNext() {
    if(this.count + 1 == this.adkar[this.currentIndex].count){
      setTimeout(()=>{
        this.count = 0
      this.currentIndex = (this.currentIndex + 1) % this.adkar.length;
      },750)
    }
    this.count++

  }
}
