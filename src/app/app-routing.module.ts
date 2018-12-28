import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BbCalendarComponent } from './bb-calendar/bb-calendar.component';

const routes: Routes = [
  { path: 'bb-run', component: BbCalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

