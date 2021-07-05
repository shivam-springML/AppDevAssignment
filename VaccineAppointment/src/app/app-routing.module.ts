import { UploadComponent } from './upload/upload.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FinalPageComponent } from './final-page/final-page.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { EmailValidator } from '@angular/forms';
const routes: Routes = [
  {
    path:'',
    component: HeaderComponent,
    children:[
      {
        path:'',
        component: HomeComponent,
      },
  
      {
        path:'upload',
        component: UploadComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'final_page',
        component:FinalPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'sign_in',
        component:SignInComponent
      },
      {
        path:'sign_up',
        component:SignUpComponent
      },
      {
        path:'email_verification',
        component:VerifyEmailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
