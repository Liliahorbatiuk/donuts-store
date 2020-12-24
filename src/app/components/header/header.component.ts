import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef: BsModalRef;
  active: boolean = false;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.toggle();
  }

  openBasket(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }


  toggle(): void {
    this.active = !this.active;
  }

}
