import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
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
  email: string;
  userImage = 'assets/images/user-image.png';
  uploadPercent: Observable<number>;
  fileUploaded = false;
  saveStatus = false;


  constructor(private authService: AuthService,
              private storage: AngularFireStorage,) { }

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
    this.email = this.currentUser.email;
    this.userImage = this.currentUser.userImage;
    // if (this.currentUser.userName) {
    //   this.userName = this.currentUser.userName;
    // }
    // if (this.currentUser.userTel) {
    //   this.userTel = this.currentUser.userTel;
    // }
    // if (this.currentUser.userImage) {
    //   this.userImage = this.currentUser.userImage;
    // }
  }

  save(): void {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      const data = {
        userName: this.userName,
        userTel: this.userTel,
        email: this.email,
        userImage: this.userImage
      };
      this.authService.updateUserData(user.id, data).then(
        () => {
          this.updateLocal(data)
        }
      )
    }
    this.saveStatus = false;

  }

  update(): void {
    this.saveStatus = true;
  }

  private updateLocal(data): void {
    const local = {
      ...this.currentUser,
      ...data
    };
    localStorage.setItem('user', JSON.stringify(local));
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.userImage = url;
        this.fileUploaded = true;
      });
    });
  }

}
