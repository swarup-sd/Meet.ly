import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_gurds/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditDeactivateGuard } from './_gurds/member-edit-deactivate.guard';

//Routes has to be object of routs with path for paremeters use :
/* This code is defining the routes for an Angular application using the `Routes` interface from the
`@angular/router` module. It defines the different paths and components that should be displayed
when the user navigates to those paths. */
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'', 
  runGuardsAndResolvers:'always',
  canActivate:[AuthGuard],
  children:[
    {path:'members',component:MemberListComponent},
    {path:'members/:username',component:MemberDetailComponent},
    {path:'member/edit',component:MemberEditComponent,canDeactivate:[MemberEditDeactivateGuard]},
    {path:'lists',component:ListsComponent},
    {path:'messages',component:MessagesComponent}
  ]},
  {path:'not-found', component:NotFoundComponent},
  {path:'server-error', component:ServerErrorComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
