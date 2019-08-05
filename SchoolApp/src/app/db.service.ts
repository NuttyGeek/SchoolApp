import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { User } from './modals/user';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './modals/book';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private db: AngularFireDatabase) {}

  /**
   * get the user object in db to know the profile
   * @param userId user id you want to retrieve
   */
  getUserObj(userId: string): Observable<any>{
    return this.db.object('/users/'+userId).valueChanges();
  }

  /**
   * returns the profile of a user from db
   * @param userId user id of the user
   */
  getProfile(userId: string): Observable<string>{
    return this.db.object('users/'+userId).valueChanges().pipe(map((user: User)=>{
      return user.profile;
    }));
  }

  /**
   * return list if users as observable
   */
  getAllUsers(): Observable<AngularFireAction<DatabaseSnapshot<User>>[]>{
    return this.db.list<User>('users').snapshotChanges(['child_added', 'child_removed']);
  }

  /**
   * /**
   * getting filtered list of students from firebase, you can do it locally also, but it is good to filter it locally
   * if you already have list of all users
   */
  getAllStudents(): Observable<User[]>{
    //  trying to get all students
    return this.db.list<User>('users', ref => ref.orderByChild('profile').equalTo('student')).valueChanges();
  }

  /**
   * getting filtered list of teachers from firebase, you can do it locally also, but it is good to filter it locally
   * if you already have list of all users
   */
  getAllTeachers(): Observable<User[]>{
    return this.db.list<User>('users', ref=> ref.orderByChild('profile').equalTo('teacher')).valueChanges();
  }

  /**
   * getting filtered list of librarians from firebase, you can do it locally also, but it is good to filter it locally
   * if you already have list of all users
   */
  getAllLibrarians(): Observable<User[]>{
    return this.db.list<User>('users', ref=> ref.orderByChild('profile').equalTo('librarian')).valueChanges();
  }

  /**
   * this fxn creates the event in database
   * @param event event object from the admin form
   */
  createEvent(event):Promise<any>{
    console.log("[Db Service] event object: "+JSON.stringify(event));
    let ref = this.db.list("events");
    return ref.push(event);
  }

  /**
   * this fxn get all events from db
   */
  getAllEvents(): Observable<AngularFireAction<DatabaseSnapshot<unknown>>[]>{
    return this.db.list("events").snapshotChanges();
  }

  /**
   * this fxn deletes the event from db
   * @param eventId event id
   */
  deleteEvent(eventId: string): Promise<any>{
    return this.db.object("events/"+eventId).remove();
  }

  /**
   * this fxn returns an observable which gives a list of
   */
  getBookRequests():Observable<any>{
    return this.db.list("book-requests").snapshotChanges();
  }

  createTimetable(classs:string, url:string):Promise<any>{
    return this.db.object("timetables/"+classs).set(url);
  }

  getAllTimetables(){
    return this.db.list("timetables").snapshotChanges();
  }

  deleteTimetable(classs:string):Promise<any>{
    return this.db.object("timetables/"+classs).remove();
  }

}
