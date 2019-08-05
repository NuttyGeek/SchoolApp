import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  //URL = "https://us-central1-schoolapp-8f7a1.cloudfunctions.net/createUser";
  URL_create_user = "http://localhost:5000/schoolapp-8f7a1/us-central1/createUser";
  URL_delete_user = " http://localhost:5000/schoolapp-8f7a1/us-central1/deleteUser";

  constructor(private http: HttpClient) {
  }

  /**
   * this function creates the student by calling the firebae cloud function
   * @param name name of the student
   * @param email email of the student
   * @param password password of the student
   * @param profile profile of the student
   * @param classs class of the student
   * @param rollno roll no of student
   */
  createStudent(name: string, email: string,password:string, profile:string, classs:string, rollno:string):Observable<any>{
    return this.http.post(this.URL_create_user, {
      user: {
        name: name,
        email: email,
        password: password,
        profile: profile,
        class: classs,
        rollno: rollno
      }
    });
  }

  /**
   * this fucntion create a teacher by calling firebase cloud function
   * @param name name of teacher
   * @param email email of teacher
   * @param password password of teacher account
   * @param profile profile of teacher which is teacher always
   * @param designation designation of teacher
   */
  createTeacher(name: string, email:string, password: string, profile:string, designation: string){
    return this.http.post(this.URL_create_user, {
      user: {
        name: name,
        email:email,
        password: password,
        profile: profile,
        designation: designation
      }
    });
  }

  /**
   *
   * @param name name of the librarian
   * @param email email
   * @param password password for librarian
   * @param profile profile of librarian which is libraian everytime
   */
  createLibrarian(name: string, email:string, password:string, profile:string){
    return this.http.post(this.URL_create_user, {
      user: {
        name: name,
        email: email,
        profile: profile,
        password: password
      }
    },{ responseType: 'text'}
    );
  }

  /**
   * this fxn makes a http call to firebase fucntion to delete the specified user
   * @param uid uid of the user to delete
   */
  deleteUser(uid:string): Observable<any>{
    return this.http.post(this.URL_delete_user, {
      uid: uid
    }, {responseType: 'text'});
  }

}
