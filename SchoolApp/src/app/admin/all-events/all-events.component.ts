import { Component, OnInit } from '@angular/core';
import {EventSnapshot} from '../../modals/event';
import { DbService } from 'src/app/db.service';
import { Observable } from 'rxjs';
import { DataSnapshot, AngularFireAction, DatabaseSnapshot, DatabaseSnapshotDoesNotExist } from '@angular/fire/database/interfaces';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  eventSnapshots: EventSnapshot[];

  constructor(private db: DbService, private toast:ToastService) {}

  ngOnInit() {
    this.eventSnapshots = [];
    // getting all events
    this.db.getAllEvents().subscribe((actions)=>{
      this.eventSnapshots = [];
      actions.forEach(action=>{
        let key = action.key;
        let event = action.payload.val();
        let eventSnapshot:EventSnapshot = {
          id: key,
          ...event
        } as EventSnapshot;
        console.log(eventSnapshot);
        this.eventSnapshots.push(eventSnapshot);
      });
    });
  }

  delete(index: string){
    let id = this.eventSnapshots[index];
    this.db.deleteEvent(id).then(()=>{
      this.toast.show("Event Deleted !");
    })
  }

}
