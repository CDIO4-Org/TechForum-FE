import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { SupportiveComponent } from './supportive.component';
import { SupportiveRoutingModule } from './supportive-routing.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    SupportiveComponent,
    ErrorComponent,
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    SupportiveRoutingModule,
    ToastrModule.forRoot(),
  ]
})
export class SupportiveModule { }
