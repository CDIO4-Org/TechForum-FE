import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportiveComponent } from './supportive.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';



const routes: Routes = [{
  path: '', component: SupportiveComponent,
  children: [
    { path: 'coming-soon', component: ComingSoonComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
    { path: 'error', component: ErrorComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportiveRoutingModule { }
