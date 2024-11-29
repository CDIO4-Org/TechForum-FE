import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeMainComponent } from './user/home-main/home-main.component';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { CommentComponent } from './user/comment/comment.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { BlogLikedComponent } from './user/blog-liked/blog-liked.component';
import { BlogBookmarkedComponent } from './user/blog-bookmarked/blog-bookmarked.component';
import { BlogApproveComponent } from './admin/blog-approve/blog-approve.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { BlogPostedComponent } from './user/blog-posted/blog-posted.component';
import { LayoutModule } from '../../shared/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    ComponentsComponent,
    HomeMainComponent,
    BlogDetailComponent,
    CommentComponent,
    UserInfoComponent,
    BlogLikedComponent,
    BlogBookmarkedComponent,
    BlogApproveComponent,
    UserListComponent,
    BlogPostedComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class ComponentsModule { }
