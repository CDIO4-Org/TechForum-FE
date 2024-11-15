import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthRightComponent } from './auth-right/auth-right.component';
import { AuthRoutingModule } from '../../auth/auth-routing.module';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthRightComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthRightComponent
  ]
})
export class AuthenticationModule { }
