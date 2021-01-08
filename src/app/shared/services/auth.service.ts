import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../classes/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkSignIn: Subject<boolean> = new Subject<boolean>();
  private dbPath = '/users';
  userRef: AngularFirestoreCollection<any> = null;


  constructor(private http: HttpClient,
              private db: AngularFirestore,
              private auth: AngularFireAuth,
              private router: Router) {
              this.userRef = this.db.collection(this.dbPath);

  }

  signUp(email: string, password: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        console.log(userResponse);
        const user = {
          email: userResponse.user.email,
          phone: userResponse.user.phoneNumber,
          role: 'user'
        };
        // const user = new Profile(userResponse.user.email)
        this.db.collection('users').add({...user})
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
        this.db.collection('users').ref.where('email', '==', userResponse.user.email).onSnapshot(
          snap => {
            snap.forEach(user => {
              const myUser = {
                id: user.id,
                ...user.data() as any
              }
              localStorage.setItem('user', JSON.stringify(myUser));
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

  updateUserData(id: string, data: any): Promise<void> {
    return this.userRef.doc(id).update({ ...data });
  }

}
