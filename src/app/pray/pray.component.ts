import { Component, Input } from '@angular/core';
import { Pray } from '../model/pray';

@Component({
  selector: 'app-pray',
  templateUrl: './pray.component.html',
  styleUrls: ['./pray.component.css']
})
export class PrayComponent {

  @Input() prayer!: any

  ngOnInit(){
    //console.log(this.prayer);

  }
}
