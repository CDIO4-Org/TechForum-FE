import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './user/home-main/home-main.component';



const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      { path: 'home-main', component: HomeMainComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
