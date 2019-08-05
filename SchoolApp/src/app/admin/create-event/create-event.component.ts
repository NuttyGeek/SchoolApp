import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from 'src/app/db.service';
import { ToastService } from 'src/app/toast.service';
import { throwMatDialogContentAlreadyAttachedError, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  eventForm: FormGroup;
  loading: boolean;
  date:string;

  constructor(private fb: FormBuilder, private db: DbService, private toast: ToastService) { }

  ngOnInit() {
    this.date = null;
    this.loading = false;
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  /**
   * trigggered when the create event button is clicked
   */
  submit(){
    this.loading = true;
    let form  = this.eventForm.value;
    console.log(form);
    let event = {
      name: form.name,
      location: form.location,
      time: form.time,
      date: this.date,
      description: form.description
    }
    this.db.createEvent(event).then(()=>{
      this.toast.show("Event Created !");
      this.loading = false;
    });
    this.clearForm();
  }

  /**
   * this fxn clears the form
   */
  clearForm(){
    this.eventForm.reset();
    this.eventForm.markAsPristine();
    this.eventForm.markAsUntouched();
    this.eventForm.updateValueAndValidity();
  }

  /**
   * this fxn is triggered when date is changed
   * @param event event of date changed
   */
  dateChanged(event: MatDatepickerInputEvent<string>){
    console.log(event.value);
    let date = new Date(event.value);
    let dateString = date.getDate()+ "-"+date.getMonth()+"-"+date.getFullYear();
    this.date = dateString;
  }

}
