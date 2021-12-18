import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {
  tutorials: Tutorial[];

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.loadTutorials();
  }
  loadTutorials() {
    this.tutorialService.getListOfTutorials().subscribe(response => {
      console.log(response);
      this.tutorials = response;
    })
  }

}
