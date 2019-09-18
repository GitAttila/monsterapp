import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'newuser', component: UserComponent },
  { path: 'edit/:userId', canActivate: [AuthGuardService], component: UserComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
