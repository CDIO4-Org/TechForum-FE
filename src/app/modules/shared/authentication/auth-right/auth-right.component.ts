import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth-right',
  templateUrl: './auth-right.component.html',
  styleUrls: ['./auth-right.component.css']
})
export class AuthRightComponent implements OnInit {

  constructor(
    private render : Renderer2
  ) { }

  ngOnInit(): void {
    const script = this.render.createElement('script');
    script.src = 'assets/js/slide1.js';
    this.render.appendChild(document.body, script);
  }

}
