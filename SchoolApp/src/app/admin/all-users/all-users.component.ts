import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/db.service';
import { User } from 'src/app/modals/user';
import { UserSnapshot } from 'src/app/modals/user_snapshot';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material';
import { filter, tap, map } from 'rxjs/operators';
import { RestService } from '../rest.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  snapshots: UserSnapshot [];
  usersShown: UserSnapshot [];
  listTitle: string;
  loading: boolean;

  constructor(private db: DbService,private rest: RestService, private toast: ToastService) {
    this.snapshots = [];
    this.usersShown = [];
  }

  ngOnInit() {
    this.loading = true;
    this.db.getAllUsers().subscribe((actions)=>{
      // nullifying is everytime
      console.log("value of snapshots before get new values: "+this.snapshots.toString());
      this.snapshots = [];
      console.log("value of snapshots after assigning it to empty array "+this.snapshots.toString());
      console.log("logging actions: ");
      actions.forEach(action =>{
        let user: User = {
          name: action.payload.val().name,
          email: action.payload.val().email,
          profile: action.payload.val().profile
        }
        let shot: UserSnapshot = {
          uid: action.key,
          name: user.name,
          email: user.email,
          profile: user.profile
        }
        this.snapshots.push(shot);
        console.log("after adding value to snapshot array: "+this.snapshots.toString());
      });
      //  by default filter All is activated
      this.filterAll();
      this.loading = false;
    });
  }

  /**
   * this fxn is triggered when button delete button is clicked
   * @param event common button click event
   */
  deleteUser(uid: string){
    this.loading = true;
    console.log("uid of user to be deleted: "+uid);
    this.rest.deleteUser(uid).subscribe(()=>{
      console.log("user deleted !");
      this.toast.show("User Deleted !");
      this.loading = false;
      // update the list
      this.filterAll();
      // this.toast.show("User Deleted !");
    }, (err: Error)=>{
      console.log("error while deleting user: "+err.message);
      this.toast.show("Cannot delete User !:"+err.message);
      // this.toast.show("Error while deleting the user");
    });
  }

  /**
   *this fxn changes filter activated
   * @param event Mat Button Event
   */
  changeFilter(event: MatButtonToggleChange){
    console.log("change filter triggered");
    console.log("value: "+event.value);
    switch(event.value){
      case "students": this.filterStudents();
      break;
      case "teachers": this.filterTeachers();
      break;
      case "librarians": this.filterLibrarians();
      break;
      case "all": this.filterAll();
      break;
      default: this.filterAll();
    }
  }

  /**
   * this fxn is triggered when student button is clicked from button group
   * and it changes the title of the list and updates the list content
   */
  filterStudents(){
    var students: UserSnapshot[] = [];
    for (let i=0; i<this.snapshots.length; i++){
      let snapshot = this.snapshots[i];
      if(snapshot.profile === 'student'){
        students.push(snapshot);
      }
    }
    this.usersShown = students;
    this.listTitle = "All Students";
  }

  /**
   * this fxn is triggered when Teacher button is clicked from button group
   * and changes the title of the list and updates the list content
   */
  filterTeachers(){
    var teachers: UserSnapshot[] = [];
    for (let i=0; i<this.snapshots.length; i++){
      let snapshot = this.snapshots[i];
      if(snapshot.profile === 'teacher'){
        teachers.push(snapshot);
      }
    }
    this.usersShown = teachers;
    this.listTitle = "All Teachers";
  }

  /**
   * this fxn is triggered when Librarian button clicked form button group
   * and it changes the title of the list and change the list content
   */
  filterLibrarians(){
    var librarians: UserSnapshot[] = [];
    for (let i=0; i<this.snapshots.length; i++){
      let snapshot = this.snapshots[i];
      if(snapshot.profile === 'librarian'){
        librarians.push(snapshot);
      }
    }
    this.usersShown = librarians;
    this.listTitle = "All Librarians";
  }

  /**
   * this fxn is triggered when All Users button is clicked in UI
   * and it changes the title of the page and chnage list contents
   */
  filterAll(){
    this.usersShown = this.snapshots;
    this.listTitle = "All Users";
  }
}
