import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private dbPath = '/categories';
  categoriesRef: AngularFirestoreCollection<ICategory> = null;

  constructor() { }
}
