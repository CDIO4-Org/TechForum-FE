import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  spinner: boolean = true

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.spinner = false
    }, 750)
  }

}
