import { NgAuthService } from './auth.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule} from '@angular/forms'
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { FinalPageComponent } from './final-page/final-page.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UploadComponent } from './upload/upload.component';

var config = {
  apiKey: "AIzaSyDxiXaFg5eMS6w9Ydj-s_YtqgGr9IYo--w",
  authDomain: "still-chassis-302715.firebaseapp.com",
  projectId: "still-chassis-302715",
  storageBucket: "still-chassis-302715.appspot.com",
  messagingSenderId: "956983685261",
  appId: "1:956983685261:web:19cced52ba4522e3a472c4"
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FinalPageComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,

  ],
  providers: [NgAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
