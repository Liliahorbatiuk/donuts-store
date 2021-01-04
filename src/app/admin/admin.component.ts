import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from '../shared/services/auth-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authAdminServices: AuthAdminService) {  }

  ngOnInit(): void {
  }

  signOutAdmin(): void {
    this.authAdminServices.signOutAdmin();
  }

}
