import { Injectable, NgZone } from '@angular/core';
import auth from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';

export interface User {
    uid: string;
    email: string;
 
 }

@Injectable({
  providedIn: 'root'
})

export class NgAuthService {
    userState: any;

    constructor(
      public afs: AngularFirestore,
      public afAuth: AngularFireAuth,
      public router: Router,
      public ngZone: NgZone,
      public spinner: NgxSpinnerService,
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }
  
    SignIn(email, password) {
      this.spinner.show()
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            console.log('signin')
                      

          });
          console.log(result.user)
          this.SetUserData(result.user);
          
          this.spinner.hide()
          this.router.navigate(['/upload']);
        }).catch((error) => {
          this.spinner.hide()
          window.alert(error.message)
        })
    }
  
    SignUp(email, password) {
      this.spinner.show()
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.spinner.hide()
          this.SendVerificationMail().then(()=>{
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'))
            this.SetUserData(result.user);
            console.log('Verification')
          })
          
          


        }).catch((error) => {
          this.spinner.hide()
          window.alert(error.message)
        })

    }

    SendVerificationMail() {
      this.spinner.show()
      return this.afAuth.currentUser.then(u => u.sendEmailVerification())
      .then(() => {
        this.spinner.hide()
        this.router.navigate(['email_verification']);
      })
  }    

     
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user)
      return (user !== null) ? true : false;
    }
  
    
   
    SetUserData(user) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
      }
      localStorage.setItem('email',user.email)
      
      return userRef.set(userState, {
        merge: true
      })
    }
   
    SignOut() {
      this.spinner.show()
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        console.log('signout')
        this.spinner.hide()
        this.router.navigate(['sign_in']);
      })
    }
    
    // getToken(){
    //   return this.afAuth.currentUser.getIdToken()
    // }
}