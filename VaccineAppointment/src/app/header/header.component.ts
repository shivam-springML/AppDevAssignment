import { NgAuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any;
  constructor(public ngAuthService:NgAuthService ) { }
  
  get_user(){
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user.email)
    return this.user.email
  }
  ngOnInit(): void {
   
  }

}
