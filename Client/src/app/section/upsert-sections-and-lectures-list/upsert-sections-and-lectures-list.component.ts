import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { Post } from 'src/app/_models/post.model';
import { Section } from 'src/app/_models/sectionDto.model';
import { Status } from 'src/app/_utils/status.enum';
import { SectionsAndLecturesFormService } from './sections-and-lectures-form.service';

@Component({
  selector: 'upsert-sections-and-lectures-list',
  templateUrl: './upsert-sections-and-lectures-list.component.html',
  styleUrls: ['./upsert-sections-and-lectures-list.component.css']
})
export class UpsertSectionsAndLecturesListComponent implements OnInit {
  sections: Section[] = [];

  status: typeof Status;

  constructor(
    private fb: FormBuilder,
    public sectionsAndLecturesFormService: SectionsAndLecturesFormService) {
      this.status = Status;
    }

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

  onSectionChangeEvent(event: any, sectionIndex: number) {
    this.sections[sectionIndex].title = event.target.value;
    console.log(this.sections);
    this.updateFormData();
  }

  onLectureChangeEvent(event: any, sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures[lectureIndex].post.title = event.target.value;
    this.updateFormData();
  }

  onAddSection() {
    this.sections.push( {
      title: '',
      position: this.sections.length
    } as Section);
    this.updateFormData();
  }

  onAddLecture(sectionId: number) {
    this.sections[sectionId].lectures.push({
      post: {
        id: null,
        status: this.status.Draft,
        title: '',
        excerpt: '',
        content: '',
        featuredImageUrl: '',
        meta: null,
        appUser: null,
        password: '',
        length: 0,
        tags: null,
        category: null
      } as Post,
      position: this.sections[sectionId].lectures.length,
    } as Lecture);
    this.updateFormData();
  }

  private updateFormData() {
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.patchValue({
      sections: this.sections
    })
  }
}
