import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/_models/tutorialDto.model';

@Component({
  selector: 'tutorial-item',
  templateUrl: './tutorial-item.component.html',
  styleUrls: ['./tutorial-item.component.css']
})
export class TutorialsItemComponent implements OnInit {
  @Input() tutorial: Tutorial;

  constructor() { }

  ngOnInit(): void {
  }

}
