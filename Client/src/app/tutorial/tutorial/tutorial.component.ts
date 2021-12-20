import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
    let re = /\-/gi;
    console.warn(this.route.url.split('/')[2].replace(re, ' '));
  }

}
