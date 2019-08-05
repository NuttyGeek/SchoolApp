import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppModule } from '../app.module';
import { MyNavComponent } from './my-nav/my-nav.component';
import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './users/users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { SharedModule } from '../shared/shared.module';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventsComponent } from './events/events.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { BookRequestsComponent } from './book-requests/book-requests.component';
import { TimetableComponent } from './timetable/timetable.component';


@NgModule({
  declarations: [AdminHomeComponent, MyNavComponent, UsersComponent, AdminDashboardComponent, CreateUserComponent, AllUsersComponent, CreateEventComponent, EventsComponent, AllEventsComponent, BookRequestsComponent, TimetableComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class AdminModule { }
