import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiTimePraysService } from '../service/api-time-prays.service';
import { Pray } from '../model/pray';
@Component({
  selector: 'app-list-prays',
  templateUrl: './list-prays.component.html',
  styleUrls: ['./list-prays.component.css'],
})
export class ListPraysComponent {
  constructor(private getData: ApiTimePraysService) {}

  prays: Pray[] = [];




  ngOnInit(): void {
    this.getData.getTimePrays().subscribe((data: any) => {
      const timingsData = data.data.timings;

      // Specify the names of the prayers you want to filter
      const specifiedPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const specifiedImages = [
        'fajr.png',
        'dhhr.png',
        'asr.png',
        'maghrib.png',
        'isha.png',
      ];

      // Create an array of Pray objects with specified prayers and images
      this.prays = specifiedPrayers.map((prayerName, index) => {
        return {
          name: prayerName,
          time: timingsData[prayerName],
          image: '/assets/' + specifiedImages[index], // Assign the image based on the index
        };
      });

      // Get the current time in 'hh:mm:ss' format
      const currentTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      this.prays.forEach(pray => {
        if (pray.time !== null) {
          const timeDiff = getTimeDifference(currentTime, "15:26:00");
          console.log(`Time difference for ${pray.name}: ${timeDiff}`);
        } else {
          console.log(`Prayer time not available for ${pray.name}`);
        }
      });
    });
  }
}
export function getTimeDifference(
  currentTime: string,
  nextPrayTime: string
): string {
  // Assuming currentTime and nextPrayTime are strings in the format 'hh:mm:ss'

  const [currentHours, currentMinutes, currentSeconds] = currentTime
    .split(':')
    .map(Number);
  const [nextHours, nextMinutes, nextSeconds] = nextPrayTime
    .split(':')
    .map(Number);

  const currentDateTime = new Date(
    0,
    0,
    0,
    currentHours,
    currentMinutes,
    currentSeconds
  );
  const nextPrayDateTime = new Date(
    0,
    0,
    0,
    nextHours,
    nextMinutes,
    nextSeconds
  );

  let difference =
    Math.abs(nextPrayDateTime.getTime() - currentDateTime.getTime()) / 1000;

  const hours = Math.floor(difference / 3600);
  difference %= 3600;
  const minutes = Math.floor(difference / 60);
  const seconds = difference % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedTime;
}
