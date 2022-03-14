import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  tutorial: Tutorial;
  sidebarWidth = 'col-3';
  conetentWidth = 'col-9';
  sideBarVisible = true;
  waIntersectionObserver: IntersectionObserver;

  constructor(
    private route: Router,
    private tutorialService: TutorialService,
    private title: Title,
    private meta: Meta
    ) { }

  ngOnInit(): void {
    this.loadTutorial();

    this.scrollToTop();
  }

  private loadTutorial() {
    let re = /\_/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    this.tutorialService.getTutorialByTitle(title).subscribe(response => {
      this.tutorial = response;

      this.updateMeta();
      this.title.setTitle(this.tutorial.post.title);
    })
  }

  private updateMeta() {
    this.meta.updateTag({name: "title", content: this.tutorial.post.meta?.seoTitle || ''})
    this.meta.updateTag({name: "description", content: this.tutorial.post.meta?.metaDescription || ''})
    this.meta.updateTag({name: "image", content: this.tutorial.post.featuredImageUrl})
    this.meta.updateTag({name: "site", content: environment.siteTitle})
  }

  private scrollToTop() {
    window.scrollTo(0, 0);
  }
  
  hideSidebar() {
    this.sideBarVisible = !this.sideBarVisible;

    if(this.sideBarVisible) {
      this.sidebarWidth = 'col-3';
      this.conetentWidth = 'col-9';
    } else {
      this.sidebarWidth = 'col-1';
      this.conetentWidth = 'col';
    }
  }

  updateContent(event: string) {
    console.log(event);
    this.tutorial.post.content = event;
  }
}