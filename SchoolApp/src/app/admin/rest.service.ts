import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  URL = "https://us-central1-schoolapp-8f7a1.cloudfunctions.net/createUser";

  constructor(private http: HttpClient) {
  }

  createStudent(name: string, email: string,password:string, profile:string, classs:string, rollno:string):Observable<any>{
    return this.http.post(this.URL, {
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

  createTeacher(name: string, email:string, password: string, profile:string, designation: string){
    return this.http.post(this.URL, {
      user: {
        name: name,
        email:email,
        password: password,
        profile: profile,
        designation: designation
      }
    });
  }

  createLibrarian(name: string, email:string, password:string, profile:string){
    return this.http.post(this.URL, {
      user: {
        name: name,
        email: email,
        profile: profile,
        password: password
      }
    });
  }

}
