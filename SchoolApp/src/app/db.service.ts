import { Injectable } from '@angular/core';
import { FirebaseDatabase } from '@angular/fire';
import { User } from './modals/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

}
