import { Component, EventEmitter, Output } from '@angular/core';
import { ApiTimePraysService } from '../service/api-time-prays.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Output() cityFromOutput = new EventEmitter<any>()
  selectedCity: any = localStorage.getItem("indexOfCity");

  constructor(private apiService:ApiTimePraysService){ }

  cities: { english: string; arabic: string; checked: boolean }[] = [
    { english: 'Gafsa', arabic: 'قفصة' ,checked: false},
    { english: 'Tunis', arabic: 'تونس' ,checked: false},
    { english: 'Nabeul', arabic: 'نابل' ,checked: false},
  ];
  city!: any

  ngOnInit(): void {
    this.city = localStorage.getItem("indexOfCity")?.split('-');
    const selectedEnglish = this.city[1].trim(); // Assuming English name is in index 1 after split

      this.cities = this.cities.map((cityE) => {
        if (cityE.english === selectedEnglish) {
          return { ...cityE, checked: true };
        } else {
          return cityE; // Return the city unchanged if it's not the selected city
        }
      });

    const checkedCityIndex = this.cities.findIndex(city => city.checked)

    if(checkedCityIndex != -1){
      const checkedCity = this.cities.splice(checkedCityIndex,1)[0]
      this.cities.unshift(checkedCity)
    }
  }


  onCityChange(event: any) {
    this.city = event.target.value;
    localStorage.setItem("indexOfCity", this.city)
    this.apiService.fetchPrayerTimings(this.city);
    this.cityFromOutput.emit(this.city )
  }

}
