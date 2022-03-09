import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.css']
})
export class TocComponent implements OnInit {
  @Input() contentIn: string;
  @Output() contentOut: EventEmitter<number> = new EventEmitter<number>(true);
  toc: TocItem[] = [];
  ids: string[] = [];

  constructor(
    private route: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.toc = this.createdTableOfContent(this.contentIn);
  }

  createdTableOfContent(content: any) {
    var contentdiv = document.createElement("div");
    contentdiv.innerHTML = content;

    var myArrayOfHeadlineNodes = [].slice.call(contentdiv.querySelectorAll("h1, h2, h3"));

    var toc: TocItem[] = [];

    var id_suffix = 0;
    if(this.route.url.includes('#')) {
      var url = this.route.url.split('#')[0];
    } else {
      var url = this.route.url;
    }

    var ids: string[] = [];

    myArrayOfHeadlineNodes.forEach(
      function(value: Element, key, listObj) { 
        var tocItem: TocItem = new TocItem();

        switch(value.tagName.toLowerCase()) {
          case 'h1': {
            tocItem.header = 'h1';
            break;
          }
          case 'h2': {
            tocItem.header = 'h2';
            break;
          }
          case 'h3': {
            tocItem.header = 'h3';
            break;
          }
        }

        tocItem.id = "header_" + ++id_suffix;
        value.id = tocItem.id;
        ids.push(value.id);

        if(!url.includes('#') && tocItem.url === undefined || tocItem.url === '') {
          tocItem.url = url + '#' + value.id;
        }

        tocItem.text = (value.textContent) ? value.textContent : "";

        toc.push(tocItem);
      }
    );
    
    this.contentOut.emit(this.sanitizer.bypassSecurityTrustHtml(contentdiv.innerHTML) as any);

    this.ids = ids;

    return toc;
  }

  updateTocPosition() {
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

    var root = document.querySelector('#root');
    if(root) {
      var position = root.getBoundingClientRect();
      if(position.bottom < window.innerHeight) {
        fullyVisibleElements = fullyVisibleElements.filter(_element => _element.id == null);
        var element = document.querySelector('#' + this.ids[this.ids.length - 1]);
        if(element) {
          fullyVisibleElements.push(element);
        }
      }
    }

    if(fullyVisibleElements.length > 0) {
      this.toc.forEach((tocItem: TocItem) => {
        var firstItem = fullyVisibleElements[0];
        tocItem.isChecked = tocItem.id === firstItem.id;
      })
    }
  }
 
  @HostListener('window:scroll', ['$event.target']) // for window scroll events
  scroll(e: any) {
    this.updateTocPosition();
  }
}


export class TocItem {
  id: string;
  header: string;
  text: string;
  url: string;
  isChecked: boolean = false;
}
