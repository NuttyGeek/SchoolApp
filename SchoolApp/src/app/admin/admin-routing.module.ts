import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersComponent } from './users/users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EventsComponent } from './events/events.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { TimetableComponent } from './timetable/timetable.component';


const routes: Routes = [
  { path: '', component: AdminHomeComponent ,
    children: [
      {path: '', component: AdminDashboardComponent},
      {path: 'users', component: UsersComponent},
      {path: 'events', component: EventsComponent},
      {path: 'book-requests', component: BookRequestsComponent},
      {path: 'timetable', component: TimetableComponent}
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
