import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  /**
   * login user with firebase
   * @param email email of the user
   * @param password password of the user
   */
  login(email: string, password: string){
    this.auth.auth.signInWithEmailAndPassword(email, password).then(
      (user: firebase.auth.UserCredential)=>{
        this.router.navigate(['/']);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  /**
   * returns the observables of user logged in
   */
  getAuthUserObject(){
    return this.auth.user.pipe(map((user: firebase.User)=>{
      console.log(user);
    }));
  }

  getUserId(): string{
    return this.auth.auth.currentUser.uid;
  }

  isLoggedIn(): boolean{
    if(this.auth.auth.currentUser){
      return true;
    }
    else{
      return false;
    }
  }

}
