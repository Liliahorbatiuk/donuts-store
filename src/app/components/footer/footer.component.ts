import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollToAdv(): void {
    document.getElementById('advantages').scrollIntoView({ behavior: "smooth" });
  }

  scrollToDel(): void {
    document.getElementById('delivery').scrollIntoView({ behavior: "smooth" });
  }

  scrollToFeed(): void {
    document.getElementById('feedback').scrollIntoView({ behavior: "smooth" });
  }

}
