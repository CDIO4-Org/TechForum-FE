import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    NavigationComponent
  ]
})
export class LayoutModule { }
