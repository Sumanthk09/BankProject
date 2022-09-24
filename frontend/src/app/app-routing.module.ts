import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankerComponent } from './banker/banker.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
   {path:"",component:LoginComponent},
   {path:"customer",component:CustomerComponent},
   {path:"banker",component:BankerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
