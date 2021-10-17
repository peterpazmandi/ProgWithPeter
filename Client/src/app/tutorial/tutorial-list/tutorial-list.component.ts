import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Status } from 'src/app/_models/status.enum';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {
  filterForm: FormGroup;
  public statuses = Status;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  private initializeForm() {
    this.filterForm = this.fb.group({
      title: ['']
    })
  }

  filter() {
    
  }
}