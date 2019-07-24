import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatSnackBar } from '@angular/material';
import { FormBuilder, Form, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  profile: string;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private rest: RestService, private toast: MatSnackBar) {

  }

  ngOnInit() {
    this.profile = "librarian";
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rollno: [''],
      class: [''],
      designation: ['']
    })
  }

  /**
   * triggered when
   */
  changeProfile(event: MatRadioChange){
    this.profile = event.value;
  }

  submit(){
    console.log("form is submitted");
    this.createUser();
    this.clearForm();
  }

  clearForm(){
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
    this.userForm.updateValueAndValidity();
  }

  createUser(){
    let userObj = {
      name: this.userForm.get("name").value,
      email: this.userForm.get("email").value,
      password: this.userForm.get("password").value,
      profile: this.profile,
      designation: this.userForm.get("designation").value,
      rollno: this.userForm.get("rollno").value,
      class: this.userForm.get("class").value
    };
    if (userObj.profile === 'student'){
      this.rest.createStudent(userObj.name, userObj.email, userObj.password, userObj.profile, userObj.class, userObj.rollno).subscribe(()=>{
        this.toast.open("Created Student !", "OK", {
          duration: 3000
        });
      })
    } else if(userObj.profile === 'teacher'){
      this.rest.createTeacher(userObj.name, userObj.email, userObj.password, userObj.profile, userObj.designation).subscribe(()=>{
        this.toast.open("Teacher Created !", "OK", {
          duration: 3000
        });
      })
    } else if(userObj.profile === 'librarian'){
      this.rest.createLibrarian(userObj.name, userObj.email, userObj.password, userObj.profile).subscribe(()=>{
        this.toast.open("Librarian Created !", "OK", {
          duration: 3000
        });
      })
    } else{
      this.toast.open("Invalid Profile selected");
    }
  }

}
