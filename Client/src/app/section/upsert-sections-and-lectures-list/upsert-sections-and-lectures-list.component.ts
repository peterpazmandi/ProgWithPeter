import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { Section } from 'src/app/_models/sectionDto.model';
import { SectionsAndLecturesFormService } from './sections-and-lectures-form.service';

@Component({
  selector: 'upsert-sections-and-lectures-list',
  templateUrl: './upsert-sections-and-lectures-list.component.html',
  styleUrls: ['./upsert-sections-and-lectures-list.component.css']
})
export class UpsertSectionsAndLecturesListComponent implements OnInit {
  sections: Section[] = [];

  constructor(
    private fb: FormBuilder,
    public sectionsAndLecturesFormService: SectionsAndLecturesFormService) { }

  ngOnInit(): void {
    this.initializeForms();

    let sub = this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.get('sections')?.valueChanges?.subscribe((value: Section[]) => {
      this.sections.push(...(value as Section[]));
      console.log(value);
      sub?.unsubscribe();
    })
  }

  private initializeForms() {
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom = this.fb.group({
      sections: [[] as Section[]]
    });
  }

  onLectureChangeEvent(event: any, sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures[lectureIndex].post.title = event.target.value;
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.patchValue({
      sections: this.sections
    })
  }

}
