import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthkarAfterPrayComponent } from './athkar-after-pray/athkar-after-pray.component';
import { ListPraysComponent } from './list-prays/list-prays.component';
import { PrayComponent } from './pray/pray.component';

const routes: Routes = [
  { path:'athkarAfterPray' , component: AthkarAfterPrayComponent},
  { path:'listOfPrayers' , component: ListPraysComponent},
  { path: 'prayer', component: PrayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
