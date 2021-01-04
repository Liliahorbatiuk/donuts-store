import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../shared/services/auth-admin.service';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authAdminServices: AuthAdminService) { }

  ngOnInit(): void {
  }

  adminSignIn(): void {
    this.authAdminServices.signInAdmin(this.email, this.password)
  }

}
