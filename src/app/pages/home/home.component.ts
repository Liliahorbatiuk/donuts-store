import { Component, OnInit } from '@angular/core';
import AOS from "aos";
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init();
  }

  slides = [
    { 
      name: 'Iryna',
      date: new Date(),
      grade: '★★★★',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nulla?'
    },
  ];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};

  addSlide() {
    this.slides.push()
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
}
