import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService, private dbService: DbService) { }

  ngOnInit() {
    // get the logged in user, if the user is not logged in navigate to login
    if (this.authService.isLoggedIn()){
      //  getting uid of the user
      let uid = this.authService.getUserId();
      console.log("uid of logged in user: "+uid);
      //  getting profile of user
      this.dbService.getProfile(uid).subscribe((profile: string)=>{
        switch(profile){
          case 'admin': this.goToAdminDashboard();
          break;
          default: console.log("got to nothing");
        }
      });

    }
    else{
      console.log("user is not logged in");
      this.router.navigate(['/login']);
    }
  }

  /**
   * open admin dashboard
   */
  goToAdminDashboard(){
    this.router.navigate(['/admin']);
  }

  /**
   * open student dahsboard
   */
  goToStudentDashboard(){
    this.router.navigate(['/student']);
  }

  /**
   * open teacher dashboard
   */
  goToTeacherDashboard(){
    this.router.navigate(['/teacher']);
  }

}
