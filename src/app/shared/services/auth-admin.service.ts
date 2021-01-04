import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  checkSignIn: Subject<boolean> = new Subject<boolean>();
  adminRef: AngularFirestoreCollection<any> = null;
  private dbPath = '/admin';

  constructor(private db: AngularFirestore,
              private auth: AngularFireAuth,
              private router: Router) {
    this.adminRef = this.db.collection(this.dbPath);
  }

  signInAdmin(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password).then(response => {
      const data = {
        id: response.user.uid,
        email: response.user.email
      };
      localStorage.setItem('admin', JSON.stringify((data)));
      response.user.getIdToken().then(
        token => {
          // console.log(token);
          localStorage.setItem('token', token);
          this.router.navigateByUrl('admin')
        }
      );
    });
  }

  signOutAdmin(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
        this.checkSignIn.next(false);
        this.router.navigateByUrl('home');
      })
  }

  checkToken(): Observable<string> {
    return this.auth.idToken;
  }
}
