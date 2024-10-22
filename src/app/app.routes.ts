import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CreatepostComponent } from './createpost/createpost.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'register', component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'userprofile', component:UserprofileComponent},
    {path:'createpost',component:CreatepostComponent}
];
