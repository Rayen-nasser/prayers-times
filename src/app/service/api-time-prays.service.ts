import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiTimePraysService {

  constructor(private http: HttpClient) { }

  url : string = "http://api.aladhan.com/v1/timingsByCity?city=gafsa&country=TN&method=8"

  getTimePrays(){
    return this.http.get<any>(this.url)
  }
}
