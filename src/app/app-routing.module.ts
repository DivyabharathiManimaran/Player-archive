import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';

const routes: Routes = [  
  { path:'player-archive', component:HomeComponent },
  { path: '', redirectTo:'/player-archive', pathMatch: 'full'},
  { path: 'player-archive', redirectTo:'/player-archive', pathMatch: 'full'},
  { path: '**', redirectTo: '/player-archive' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
