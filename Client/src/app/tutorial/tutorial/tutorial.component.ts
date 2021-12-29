import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  tutorial: Tutorial;
  sidebarWidth = 'col-3'
  conetentWidth = 'col-9'
  sideBarVisible = true;
  toc: any = null;
  waIntersectionObserver: IntersectionObserver;
  ids: string[] = [];

  constructor(
    private route: Router,
    private tutorialService: TutorialService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.loadTutorial();

    this.scrollToTop();
  }

  private loadTutorial() {
    let re = /\-/gi;
    let title = this.route.url.split('/')[2].replace(re, ' ');
    this.tutorialService.getTutorialByTitle(title).subscribe(response => {
      this.tutorial = response;

      this.toc = this.createdTableOfContent(this.tutorial.post.content);
    })
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

  createdTableOfContent(content: any) {
    // create div for holding the content
    var contentdiv = document.createElement("div");
    contentdiv.innerHTML = content;

    // create an array of headlines:
    var myArrayOfHeadlineNodes = [].slice.call(contentdiv.querySelectorAll("h1, h2, h3"));

    // initialize table of contents (toc):
    var toc = document.createElement("ul");

    // initialize a pointer that points to toc root:
    var pointer = toc;

    // will be appended to the node id to make sure it is unique on the page:
    var id_suffix = 0;
    var url = this.route.url;

    var ids: string[] = [];

    // loop through the array of headlines
    myArrayOfHeadlineNodes.forEach(
      function(value: Element, key, listObj) { 
    
        // if we have detected a top level headline ...
        if ( "H1" == value.tagName) { 
            // ... reset the pointer to top level:
            pointer = toc;
        }

        // if we are at top level and we have detected a headline level 2 ...
        if ( "H2" == value.tagName && pointer == toc ) {
          // ... create a nested unordered list within the current list item:
          pointer = pointer.appendChild(document.createElement("ul"));
        }

        // if headline has no id, add a unique id
        if ("" == value.id) {
          value.id = "header_" + ++id_suffix;
          ids.push(value.id);
        } 

        // for each headline, create a list item with the corresponding HTML content:
        if(!url.includes('#')) {
          var li = pointer.appendChild(document.createElement("li"));
          li.innerHTML = '<a href="' + url + '#' + value.id + '">' + value.textContent + '</a>';
        }
      }
    );

    // update the content with the changed contentdiv, which contains IDs for every headline
    //   note that we need to use the sanitizer.bypassSecurityTrustHtml function in order to tell angular
    //   not to remove the ids, when used as [innerHtml] attribute in the HTML template
    this.tutorial.post.content = this.sanitizer.bypassSecurityTrustHtml(contentdiv.innerHTML) as any;

    this.ids = ids;

    return(toc.innerHTML);
 }
 
  @HostListener('window:scroll', ['$event.target']) // for window scroll events
  scroll(e: any) {
    var fullyVisibleElements: Element[] = [];
    this.ids.forEach(value => {
      var element = document.querySelector('#' + value);
      if(element) {
        var position = element.getBoundingClientRect();
      
        // checking whether fully visible
        if(position.top >= 0 && position.bottom <= (window.innerHeight / 4)) {
          fullyVisibleElements.push(element);
        } else {
          fullyVisibleElements = fullyVisibleElements.filter(_element => _element.id !=  element?.id);
        }
      }
    })
    console.log(fullyVisibleElements);
  }


//  createObserver(element: Element) {
//   var observeOptions = {
//     root: null,
//     margin: '10px',
//     threshold: 1.0
//   }

//   var onObserve = function (entries: any, observer: any) {
//     entries.forEach((entry: any) => {
//       if(entry.isIntersecting 
//         && Math.floor(entry.intersectionRatio) === 1){
//         console.log(entry.target.id + ' - ' + entry.boundingClientRect.y + ' - ' + entry.boundingClientRect.top);
//       }
//     })
//   }

//   var observe = new IntersectionObserver(onObserve, observeOptions)

//   observe.observe(element)
//  }
}
