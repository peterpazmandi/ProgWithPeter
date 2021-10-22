import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Editor from '../../_ckeditor5/build/ckeditor';

@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {
  createTutorialForm: FormGroup;
  public Editor = Editor;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.createTutorialForm = this.fb.group({
      title: ['']
    })
  }

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
          console.log( `Characters: ${ stats.characters }\nWords: ${ stats.words }` );
      }
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
}
