import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: MatSnackBar, private dialog: MatDialog) {

  }

  /**
   * this fxn shows a toast from wherever it is called
   * @param msg message of the toast
   */
  show(msg: string){
    // showing toast message
    this.toast.open(msg, "OK", {
      duration: 5000
    });
  }

}
