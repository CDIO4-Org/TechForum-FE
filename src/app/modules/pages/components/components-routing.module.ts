import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './user/home-main/home-main.component';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { BlogLikedComponent } from './user/blog-liked/blog-liked.component';
import { BlogBookmarkedComponent } from './user/blog-bookmarked/blog-bookmarked.component';
import { BlogApproveComponent } from './admin/blog-approve/blog-approve.component';



const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      { path: 'home-main', component: HomeMainComponent },
      { path: 'blog-detail/:id', component: BlogDetailComponent },
      { path: 'blog-liked', component: BlogLikedComponent },
      { path: 'blog-bookmarked', component: BlogBookmarkedComponent },
      { path: 'blog-approve', component: BlogApproveComponent },
      { path: 'user-list', component: BlogApproveComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
