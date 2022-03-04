import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {
  tutorials: Tutorial[] = [];
  pageNumber = 1;
  pageSize = 5;
  noMoreTutorial: boolean = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.loadTutorials();
  }
  loadTutorials() {
    this.tutorialService.getPublishedTutorialsOrderedByPublishDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.noMoreTutorial = response.result.length < 5;
      this.tutorials.push(...response.result);
    }, error => {
      console.log(error);
    })
  }

  loadMoreTutorials() {
    this.pageNumber++;
    this.loadTutorials();
  }
}
