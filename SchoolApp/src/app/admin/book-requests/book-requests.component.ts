import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { BookSnapshot } from 'src/app/modals/book';

@Component({
  selector: 'app-book-requests',
  templateUrl: './book-requests.component.html',
  styleUrls: ['./book-requests.component.css']
})
export class BookRequestsComponent implements OnInit {

  requests: BookSnapshot[];
  loading: boolean;

  constructor(private db: DbService) {}

  ngOnInit() {
    this.loading = true;
    this.requests = [];
    this.db.getBookRequests().subscribe((actions)=>{
      this.requests = [];
      actions.forEach(action=>{
        let request:BookSnapshot = {
          id: action.key,
          ...action.payload.val()
        }
        this.requests.push(request);
        console.log(this.requests);
      });
      this.loading = false;
    })
  }

}
