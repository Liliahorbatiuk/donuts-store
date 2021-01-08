import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IFeedback } from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private dbPath = '/feedback';
  feedbackRef: AngularFirestoreCollection<IFeedback> = null;

  constructor(private db: AngularFirestore) { 
    this.feedbackRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IFeedback> {
    return this.feedbackRef;
  }

  getLimitProduct(limit: number) {
    return this.db.collection(this.dbPath).ref.limit(limit);
  }

  create(product: IFeedback): any {
    return this.feedbackRef.add({ ...product });
  }

  update(id: string, data: any): Promise<void> {
    return this.feedbackRef.doc(id).update({ ...data});
  }

  delete(id: string): Promise<void> {
    return this.feedbackRef.doc(id).delete();
  }

  getOneProduct(id: string): any {
    return this.feedbackRef.doc(id).get()

  }
}
