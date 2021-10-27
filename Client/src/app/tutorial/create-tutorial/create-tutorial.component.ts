import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/categoryDto.model';
import { CategoryService } from 'src/app/_services/category.service';
import * as Editor from '../../_ckeditor5/build/ckeditor';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {
  createTutorialForm: FormGroup;
  submitted = false;
  public Editor = Editor;
  charCount: number;
  wordCount: number;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();

    this.categoryService.getCategories(null).subscribe((result: any) => {
      this.categories = result;
      console.log(this.categories);
    }, error => {
      console.log(error);
    });
    // this.items = [new TreeviewItem({ text: "Angular", value: "Angular" }), 
    //               new TreeviewItem({ text: ".NET", value: ".NET" })];
  }

  private initializeForm() {
    this.createTutorialForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(8)]],
      category: ['', [Validators.required]],
    })
  }

  private populateCategories() {

  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.createTutorialForm.invalid) {
          return;
      }
  }

  get f() { return this.createTutorialForm.controls; }

  editorConfig = {
    toolbar: {
      items: [
        'heading', '|',
        'fontfamily', 'fontsize', 'alignment', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'mediaEmbed', 'blockQuote', '|',
        'todoList', '|',
        'pageBreak', '|',
        'horizontalLine', 'findAndReplace', '|', 
        'undo', 'redo', '|', 
        'sourceEditing', 'specialCharacters', 'restrictedEditingException', '|',
        'textPartLanguage'
      ],
      shouldNotGroupWhenFull: true,

    },
    heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },
    wordCount: {
      onUpdate: (stats: any) => {
          // Prints the current content statistics.
          this.charCount = stats.characters;
          this.wordCount = stats.words;
      }
    },
    fontColor: {
      colors: [
          {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black'
          },
          {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey'
          },
          {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey'
          },
          {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey'
          },
          {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
              hasBorder: true
          },
          {
              color: '#1976D2',
              label: 'Nav Blue'
          },

          // ...
      ]
    },
    image: {
      // Configure the available styles.
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '25%',
          value: '25'
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],

      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: 'http://example.com',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: 'Bearer <JSON Web Token>'
        }
    },

    language: 'en'
  };



  value = 11;
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true
  });

  onValueChange(value: number): void {
    console.log('valueChange raised with value: ' + value);
  }











  
}

