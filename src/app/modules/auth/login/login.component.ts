import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  spinner: boolean = true
  showpass: boolean = false;


  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false;
    }, 750)
  }
  

  viewpassword() {
    this.showpass = !this.showpass;
  }

}
