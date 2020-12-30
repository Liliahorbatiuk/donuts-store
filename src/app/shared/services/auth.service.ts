import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkSignIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router) { }

  signUp(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        console.log(userResponse);
        const user = {
          id: userResponse.user.uid,
          email: userResponse.user.email,
          role: 'user'
        };
        this.db.collection('users').add(user)
          .then(collection => {
            collection.get()
              .then(user => {
                console.log(user.data);
                localStorage.setItem('user', JSON.stringify(user.data()));
                this.checkSignIn.next(true);
                this.router.navigateByUrl('profile');
              })
          })
      })
      .catch(err => console.log(err)); 
  }

  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        this.db.collection('users').ref.where('id', '==', userResponse.user.uid).onSnapshot(
            snap => {
              snap.forEach(user => {
                console.log('user after signIn', user.data());
                localStorage.setItem('user', JSON.stringify(user.data()));
                this.checkSignIn.next(true)
                this.router.navigateByUrl('profile');
              })
            }
          )
      })
  }

  signOut(): void {
    this.auth.signOut()
    .then(() => {
      localStorage.removeItem('user');
      this.checkSignIn.next(false)
      this.router.navigateByUrl('home');
    })
  }
}
