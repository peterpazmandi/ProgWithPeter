import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  tutorial: Tutorial;
  sidebarWidth = 'col-3'
  sideBarVisible = true;
  toc: any = null;

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
    } else {
      this.sidebarWidth = 'col-1';
    }
  }

  createdTableOfContent(content: any) {
    // create div for holding the content
    var contentdiv = document.createElement("div");
    contentdiv.innerHTML = content;

    // create an array of headlines:
    var myArrayOfHeadlineNodes = [].slice.call(contentdiv.querySelectorAll("h1, h2"));

    // initialize table of contents (toc):
    var toc = document.createElement("ul");

    // initialize a pointer that points to toc root:
    var pointer = toc;

    // will be appended to the node id to make sure it is unique on the page:
    var id_suffix = 0;
    var url = this.route.url;

    // loop through the array of headlines
    myArrayOfHeadlineNodes.forEach( 
      function(value: any, key, listObj) { 
    
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
         } 

         // for each headline, create a list item with the corresponding HTML content:
         var li = pointer.appendChild(document.createElement("li"));
         li.innerHTML = '<a href="' + url + '#' + value.id + '">' + value.innerHTML + '</a>';
      }
    );
    
    // debugging:
    console.log(toc.innerHTML);

    // update the content with the changed contentdiv, which contains IDs for every headline
    //   note that we need to use the sanitizer.bypassSecurityTrustHtml function in order to tell angular
    //   not to remove the ids, when used as [innerHtml] attribute in the HTML template
    this.tutorial.post.content = this.sanitizer.bypassSecurityTrustHtml(contentdiv.innerHTML) as any;

    return(toc.innerHTML);
 }

  navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
  }
  scrollToContactTypes(section: string) {
      this.route.onSameUrlNavigation = "reload";
      this.route.navigate(["/settings"], { fragment: "contactTypes" }).finally(() => {
          this.route.onSameUrlNavigation = "ignore"; // Restore config after navigation completes
      });
  }
}
