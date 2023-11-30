import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Pray } from '../model/pray';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiTimePraysService {

  specifiedPrayersEnglish: string[] = [
    'Fajr',
    'Dhuhr',
    'Asr',
    'Maghrib',
    'Isha',
  ];
  specifiedPrayersArabic: string[] = [
    'الفجر',
    'الظهر',
    'العصر',
    'المغرب',
    'العشاء',
  ];
  specifiedImages: string[] = [
    'fajr.png',
    'dhhr.png',
    'asr.png',
    'maghrib.png',
    'isha.png',
  ];

  constructor(private http: HttpClient,private router: Router) { }


  getTimePrays(city: string ){
    return this.http.get<any>(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=TN`)
  }

  fetchPrayerTimings(city: any) {
    if (city) {
      return new Promise<any>((resolve, reject) => {
        this.getTimePrays(city).subscribe((data: any) => {
          const timingsData = data.data.timings;
          const prays = this.specifiedPrayersEnglish.map((prayerName, index) => {
            return {
              name: this.specifiedPrayersArabic[index],
              time: timingsData[prayerName],
              image: '/assets/images/' + this.specifiedImages[index],
              isNext: false
            };
          });
          const nextPrayer = this.findNextPray(prays);
          const remainingFormTime = this.remainingTimeFnc(nextPrayer);
          resolve([city ,prays,nextPrayer, remainingFormTime]);
        }, error => {
          reject(error); // Handle potential errors
        });
      });
    }

    return Promise.resolve([]);
  }

  findNextPray(arrayOfPrayer: Pray[]){
    const currentTime = moment();
    let nextPrayer! : any


    let nextPrayerTime: any = null;

    arrayOfPrayer.forEach((prayer) => {
      const formatNextPrayer = moment(prayer.time, 'HH:mm');
      if (
        formatNextPrayer.isAfter(currentTime) &&
        (!nextPrayerTime || formatNextPrayer.isBefore(nextPrayerTime))
      ) {
        nextPrayerTime = formatNextPrayer;
        nextPrayer = prayer;
        nextPrayer.isNext = true
      }
    });

    //console.log(prays);

    if (nextPrayer === undefined) {
      nextPrayer =
        arrayOfPrayer.find((prayer) => prayer.name === 'الفجر') || null;
      nextPrayer = {
        ...nextPrayer,
        isNext: true
      }
      //console.log(nextPrayer);

    }


    return nextPrayer
  }

  remainingTimeFnc(nextPrayer: any){
    let remainingFormTime: any = {
      hours:0,
      minutes:0,
      seconds:0
    }

    const currentTime = moment();
    let remainingTime = moment(nextPrayer.time , 'hh:mm').diff(currentTime) ;

    if (remainingTime < 0) {
      const midNightDiff = moment('23:59:59', 'hh:mm:ss').diff(currentTime);
      const fajrToMidNight = moment(nextPrayer.time, 'hh:mm').diff(
        moment('00:00:00', 'hh:mm:ss')
      );

      const totalDiff = midNightDiff + fajrToMidNight;
      remainingTime = totalDiff;
    }


    remainingFormTime.hours = moment.duration(remainingTime).hours()
    remainingFormTime.minutes = moment.duration(remainingTime).minutes()
    remainingFormTime.seconds = moment.duration(remainingTime).seconds()
    //console.log('remaining time', this.remainingFormTime,this.nextPrayer);

    return remainingFormTime
  }

}
