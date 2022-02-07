import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { PostType } from 'src/app/_utils/post-type.enum';
import { Status } from 'src/app/_utils/status.enum';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './upsert-tutorial-list.component.html',
  styleUrls: ['./upsert-tutorial-list.component.css']
})
export class UpsertTutorialListComponent implements OnInit {
  filterForm: FormGroup;
  public statuses = Status;
  tutorials: Tutorial[] = [];  
  pageNumber = 1;
  pageSize = 20;

  postType: typeof PostType;

  constructor(
    private fb: FormBuilder,
    private tutorialService: TutorialService) {
      this.postType = PostType;
     }

  ngOnInit(): void {
    this.initializeForm();

    this.tutorialService.getTutorialsOrderedByModificationDate(this.pageNumber, this.pageSize).subscribe(response => {
      this.tutorials.push(...response.result);
    })
  }

  private initializeForm() {
    this.filterForm = this.fb.group({
      title: ['']
    })
  }

  filter() {
    
  }
}