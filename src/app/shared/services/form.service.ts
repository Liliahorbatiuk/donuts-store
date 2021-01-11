import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IForm } from '../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private dbPath = '/forms';
  formsRef: AngularFirestoreCollection<IForm> = null;

  constructor(private db: AngularFirestore) {
    this.formsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IForm> {
    return this.formsRef;
  }

  create(order: IForm): Promise<DocumentReference<IForm>> {
    return this.formsRef.add({ ...order });
  }

  delete(id: string): Promise<void> {
    return this.formsRef.doc(id).delete();
  }
}
