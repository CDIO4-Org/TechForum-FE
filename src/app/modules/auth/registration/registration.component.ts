import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  spinner: boolean = true
  showpass: boolean = true

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.spinner = false
    },750)
  }

  viewpassword() {
    this.showpass = !this.showpass;
  }
}
