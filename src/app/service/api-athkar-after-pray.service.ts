import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAthkarAfterPrayService {

  constructor(private http: HttpClient) { }

  getAthkar(){
    return this.http.get<any>('http://localhost:3000/adkar');
  }
}
