import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  userName: string;
  userTel: string;
  userEmail: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userCredential();
  }

  signOut(): void {
    this.authService.signOut()
  }

  private userCredential(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.userName = this.currentUser.userName;
    this.userTel = this.currentUser.userTel;
    this.userEmail = this.currentUser.userEmail;

  }

  save(): void {
    const data = {
      userName: this.userName,
      userTel: this.userTel,
      userEmail: this.userEmail,

    };
    this.authService.updateUserData(this.currentUser.id, data).then(() => {
      console.log('Update user ');
    })
  }

  private updateLocal(data): void {
    const local = {
      ...this.currentUser,
      ...data
    };
    localStorage.setItem('user', JSON.stringify(local));
  }

}
