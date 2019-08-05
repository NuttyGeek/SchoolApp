import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DbService } from 'src/app/db.service';
import { ToastService } from 'src/app/toast.service';
import { Timetable } from 'src/app/modals/timetable';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  timetableForm: FormGroup;
  timetables: Timetable[];
  loading:boolean;

  constructor(private fb:FormBuilder, private db:DbService, private toast:ToastService) {}

  ngOnInit() {
    this.loading = true;
    this.timetables = [];
    this.timetableForm = this.fb.group({
      class: ['', Validators.required],
      url: ['', Validators.required]
    });
    // get all timetables
    this.db.getAllTimetables().subscribe((actions)=>{
      this.timetables = [];
      actions.forEach(action=>{
          let obj:Timetable = {
            class: action.key,
            url: action.payload.val() as string
          }
        this.timetables.push(obj);
      });
      this.loading = false;
    });
  }

  submit(){
    this.loading = true;
    let url = this.timetableForm.value.url;
    let classs = this.timetableForm.value.class;
    this.db.createTimetable(classs,url).then((val)=>{
      this.loading = false;
      this.toast.show("Time Table Added !");
    }).catch((err)=>{
      this.toast.show("Error adding timetable: "+err.message);
    });
    this.clearForm();
  }

  clearForm(){
    this.timetableForm.reset();
    this.timetableForm.markAsPristine();
    this.timetableForm.markAsUntouched();
    this.timetableForm.updateValueAndValidity();
  }

  deleteTimetable(index:string){
    console.log(index);
    let timetable = this.timetables[index];
    this.db.deleteTimetable(timetable.class).then(()=>{
      this.toast.show("Timetable deleted !");
    }).catch((err)=>{
      this.toast.show("Error while deleting Timetable! "+err.message);
    })
  }

  openLink(index: string){
    let obj = this.timetables[index];
    window.open(obj.url, "_blank");
  }
}
