import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeMainComponent } from './user/home-main/home-main.component';
import { BlogDetailComponent } from './user/blog-detail/blog-detail.component';
import { BlogLikedComponent } from './user/blog-liked/blog-liked.component';
import { BlogBookmarkedComponent } from './user/blog-bookmarked/blog-bookmarked.component';
import { BlogApproveComponent } from './admin/blog-approve/blog-approve.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ManageReportComponent } from './admin/manage-report/manage-report.component';
import { SearchCategoriesComponent } from './user/search-categories/search-categories.component';



const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      { path: 'home-main', component: HomeMainComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'blog-detail/:id', component: BlogDetailComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'blog-liked', component: BlogLikedComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'blog-bookmarked', component: BlogBookmarkedComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'blog-approve', component: BlogApproveComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN'] } },
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN'] } },
      { path: 'info-personal', component: UserInfoComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'manage-categories', component: ManageCategoryComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN'] } },
      { path: 'manage-report', component: ManageReportComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN'] } },
      { path: 'search-categories/:id', component: SearchCategoriesComponent , canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
