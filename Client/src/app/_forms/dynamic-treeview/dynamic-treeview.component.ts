import { AfterContentInit, AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'dynamic-treeview',
  templateUrl: './dynamic-treeview.component.html',
  styleUrls: ['./dynamic-treeview.component.css']
})
export class DynamicTreeviewComponent implements AfterContentInit  {
  @Input() content: Category[] = [];

  @ViewChild("template") template: TemplateRef<any>;
  @ViewChild("container", {read: ViewContainerRef}) container: ViewContainerRef;

  constructor() { }

  ngAfterContentInit(): void {
    const viewRef = this.template.createEmbeddedView({
      name: "View 1"
    });
    this.container.insert(viewRef);
  }
}
