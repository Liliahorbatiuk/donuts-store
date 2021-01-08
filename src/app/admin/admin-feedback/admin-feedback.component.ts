import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feedback } from 'src/app/shared/classes/feedback.model';
import { IFeedback } from 'src/app/shared/interfaces/feedback.interface';
import { FeedbackService } from 'src/app/shared/services/feedback.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {
  adminFeed: Array<IFeedback> = [];
  feedID: string;
  name: string;
  date = new Date();
  grade: string;
  description: string;
  image: string;
  editStatus = false;
  uploadPercent: Observable<number>;

  constructor(private feedbackService: FeedbackService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getAdminFeed();
  }

  getAdminFeed(): void {
    this.feedbackService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.adminFeed = data;
    });
  }


  addAdminFeed(): void {
    const newP = new Feedback(1, this.name, this.date , this.grade, this.description, this.image);
    delete newP.id;
    this.feedbackService.create(newP).then(() => {
      console.log('Created new feed successfully!');
    })
    this.resetForm();
  }

  editAdminFeed(product: IFeedback): void {
    this.feedID = product.id.toString();
    this.name = product.name;
    this.date = product.date;
    this.grade = product.grade;
    this.description = product.description;
    this.image = product.image;
    this.editStatus = true;
  }

  private resetForm(): void {
    this.name = '';
    this.date = null;
    this.grade = null;
    this.description = '';
    this.image = null;
  }

  updateAdminFeed(): void {
    const currentFeed = new Feedback(this.feedID, this.name, this.date, this.grade, this.description, this.image);
    // delete currentProd.id;
    this.feedbackService.update(currentFeed.id.toString(), currentFeed)
      .then(() => console.log('The feed was updated successfully!'))
        .catch(err => console.log(err));
    this.resetForm();
    this.editStatus = false;
  }

  deleteAdminFeed(product: IFeedback): void {
    this.feedbackService.delete(product.id.toString())
    .then(() => console.log('The feed was delete successfully!'))
      .catch(err => console.log(err));
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${file.name}`;
    console.log(file, filePath);
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.uploadPercent = task.percentageChanges();
    task.then(image => {
      this.storage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.image = url;
        console.log(this.image);
      });
    });
  }

  scrollToEdit(): void {
    document.getElementById('editForm').scrollIntoView({ behavior: "smooth" });
  }

}
