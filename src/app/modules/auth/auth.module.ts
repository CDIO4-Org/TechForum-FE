import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyComponent } from './verify/verify.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationModule } from '../shared/authentication/authentication.module';
import { LayoutModule } from '../shared/layout/layout.module';



@NgModule({
  declarations: [
    AuthComponent,
    HomePageComponent,
    LoginComponent,
    RegistrationComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthenticationModule,
    LayoutModule
  ]
})
export class AuthModule { }
