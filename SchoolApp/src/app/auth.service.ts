import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {}

  /**
   * login user with firebase
   * @param email email of the user
   * @param password password of the user
   */
  login(email: string, password: string){
    this.auth.auth.signInWithEmailAndPassword(email, password).then(
      (user: firebase.auth.UserCredential)=>{
        console.log(user);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
