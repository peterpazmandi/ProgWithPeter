import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  tutorial: Tutorial;
  sidebarWidth = 'col-3'
  sideBarVisible = true;

  constructor(
    private route: Router,
    private tutorialService: TutorialService
    ) { }

  ngOnInit(): void {
    this.loadTutorial();
  }

  private loadTutorial() {
    let re = /\-/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    this.tutorialService.getTutorialByTitle(title).subscribe(response => {
      this.tutorial = response;

      const test = document.getElementById('test');
      if(!test) return;
      test.innerHTML = this.tutorial.post.title;
    })
  }
  
  hideSidebar() {
    this.sideBarVisible = !this.sideBarVisible;

    if(this.sideBarVisible) {
      this.sidebarWidth = 'col-3';
    } else {
      this.sidebarWidth = 'col-1';
    }
  }
}
