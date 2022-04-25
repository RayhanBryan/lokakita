import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [{
    previewImageSrc: "../../../assets/img/home/1.jpg",
    thumbnailImageSrc: "../../../assets/img/home/2.jpg"
  }
  ]

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  frontend = [
    {
      name: 'Rayhan Rizqi Bebryan',
      image: 1,
    },
    {
      name: 'Khadliratul Yusrok',
      image: 2,
    },
    {
      name: 'Adleo Malikul Karim',
      image: 3,
    },
    {
      name: 'Cindy Hilma Darmawan',
      image: 4,
    },
    {
      name: 'Intan Sari Kurniawati',
      image: 5,
    },
    {
      name: 'Toto Budi Jatmika',
      image: 6,
    }
  ]

  backend = [
    {
      name: 'Prawiro Hadi Triyono',
      image: 7,
    },
    {
      name: 'Ahmad Akbar Angkara',
      image: 8,
    },
    {
      name: 'Naviatus Solekhatun',
      image: 9,
    },
    {
      name: 'Luki Panca Indra',
      image: 10,
    },
    {
      name: 'Galih Sahar Harmono',
      image: 11,
    }
  ]

  trainer = [
    {
      name: 'Mr. Purwo',
      image: 12,
    }
  ]

  constructor() { }

  ngOnInit(): void {
    // this.photoService.getImages().then(images => this.images = images)

  }

}
