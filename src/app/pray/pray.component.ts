import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pray',
  templateUrl: './pray.component.html',
  styleUrls: ['./pray.component.css']
})
export class PrayComponent {
  @Input() prayerName: string = '';
  @Input() prayerTime: string = '';
}
