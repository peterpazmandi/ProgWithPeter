import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Lecture } from 'src/app/_models/lectureDto.model';
import { Post } from 'src/app/_models/post.model';
import { Section } from 'src/app/_models/sectionDto.model';
import { PostType } from 'src/app/_utils/post-type.enum';
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
      this.sections = this.sections.filter(s => s.id === -1);
      this.sections.push(...(value as Section[]));
      console.log(this.sections);
      //sub?.unsubscribe();
    })
  }

  private initializeForms() {
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom = this.fb.group({
      sections: [[] as Section[]]
    });
  }

  //#region Section
  onSectionChangeEvent(event: any, sectionIndex: number) {
    this.sections[sectionIndex].title = event.target.value;
    this.updateFormData();
  }

  onLectureChangeEvent(event: any, sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures[lectureIndex].post.title = event.target.value;
    this.updateFormData();
  }

  onAddSection() {
    this.sections.push( {
      title: '',
      position: this.sections.length,
      lectures: [] as Lecture[]
    } as Section);
    this.updateFormData();
  }

  onRemoveSection(sectionIndex: number) {
    this.sections = this.sections.filter(s => s.position !== sectionIndex);

    this.updateSectionPosition();
    this.updateFormData();
  }

  dropSection(event: CdkDragDrop<Section[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )

    this.updateSectionPosition();
  }

  private updateSectionPosition() {
    for(let i = 0; i < this.sections.length; i++) {
      this.sections[i].position = i;
    }
  }
  //#endregion Section

  //#region Lecture
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

  onRemoveLecture(sectionIndex: number, lectureIndex: number) {
    console.log(this.sections);
    this.sections[sectionIndex].lectures = this.sections[sectionIndex].lectures.filter(s => s.position !== lectureIndex);

    this.reorderLecturesByPosition(sectionIndex);
    this.updateFormData();
  }

  onLectureUp(sectionIndex: number, lectureIndex: number) {
    if(lectureIndex !== 0) {
      this.sections[sectionIndex].lectures[lectureIndex].position--;
      this.sections[sectionIndex].lectures[lectureIndex - 1].position++;
    }

    this.reorderLecturesByPosition(sectionIndex);
  }

  onLectureDown(sectionIndex: number, lectureIndex: number) {
    if(this.sections[sectionIndex].lectures.length - 1 !== lectureIndex) {
      this.sections[sectionIndex].lectures[lectureIndex].position++;
      this.sections[sectionIndex].lectures[lectureIndex+1].position--;
    }

    this.reorderLecturesByPosition(sectionIndex);
  }
  
  private reorderLecturesByPosition(sectionIndex: number) {
    this.sections[sectionIndex].lectures.sort(function(a, b) { return a.position - b.position });

    for(let i = 0; i < this.sections[sectionIndex].lectures.length; i++) {
      this.sections[sectionIndex].lectures[i].position = i;
    }
  }
  
  //#endregion Lecture

  private updateFormData() {
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.patchValue({
      sections: this.sections
    })
  }
}
