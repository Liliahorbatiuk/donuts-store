import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/classes/category.model';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  catID: number | string;
  nameCat: string;
  editStatus = false;


  constructor(private catService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.catService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminCategories = data;
    });
  };

  addAdminCategory(): void {
    const newCat = new Category(1, this.nameCat);
    delete newCat.id;
    this.catService.create(newCat).then(() => {
      console.log('Created new category successfully!');
    });
    this.resetForm();
  };

  deleteAdminCategory(category: ICategory): void {
    this.catService.delete(category.id.toString())
      .then(() => {
        console.log('The product was delete successfully!');
      })
      .catch(err => console.log(err));
  }

  editAdminCategory(category: ICategory): void {
    this.catID = category.id;
    this.nameCat = category.name;
    this.editStatus = true;
  };

  updateAdminCategory(): void {
    const updateCategory = {
      id: this.catID,
      name: this.nameCat
    };
    this.catService.update(updateCategory.id.toString(), updateCategory)
      .then(() => console.log('The product was updated successfully!'))
      .catch(err => console.log(err));
    this.resetForm();
    this.editStatus = false;

  };

  private resetForm(): void {
    this.nameCat = '';
    // this.disabledStatys = true
  };

}
