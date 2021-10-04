import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponentComponent } from './layout/main-component/main-component.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/session/signIn', 
    pathMatch: 'full' 
  },
  {
    path: '', 
    component: AuthComponent,
    children: [
          {path:"session",loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)}
        ]
  },
  {
    path: '', 
    component: MainComponentComponent,
    children: [
          {path:"privia", loadChildren:() => import('./privia/privia.module').then(m => m.PriviaModule)},
          {path:"super-admin", loadChildren:()=> import('./super-admin/super-admin.module').then(m=>m.SuperAdminModule)},
          {path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)}
 
       ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
