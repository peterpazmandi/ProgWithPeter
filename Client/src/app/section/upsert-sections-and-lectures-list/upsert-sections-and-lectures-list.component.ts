import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Section } from 'src/app/_models/sectionDto.model';
import { SectionsAndLecturesFormService } from './sections-and-lectures-form.service';

@Component({
  selector: 'upsert-sections-and-lectures-list',
  templateUrl: './upsert-sections-and-lectures-list.component.html',
  styleUrls: ['./upsert-sections-and-lectures-list.component.css']
})
export class UpsertSectionsAndLecturesListComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public sectionsAndLecturesFormService: SectionsAndLecturesFormService) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom = this.fb.group({
      sections: [[] as Section[]]
    })
  }

}
