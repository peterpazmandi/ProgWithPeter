import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import * as Editor from '../../_ckeditor5/build/ckeditor';
import { environment } from 'src/environments/environment';
import { MyUploadAdapter } from 'src/app/shared/my-upload-adapter';

@Component({
  selector: 'input-ckeditor',
  templateUrl: './input-ckeditor.component.html',
  styleUrls: ['./input-ckeditor.component.css']
})
export class InputCkeditorComponent implements OnInit, ControlValueAccessor {
  @Input() id: string;
  @Output() textCharCount: EventEmitter<number> = new EventEmitter<number>();
  @Output() textWordCount: EventEmitter<number> = new EventEmitter<number>();
  
  Editor = Editor;
  
  IFRAME_SRC = '//cdn.iframe.ly/api/iframe';
  IFRAMELY_API_KEY = environment.iFramelyApiKey;

  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;

  constructor(
    @Self() public ngControl: NgControl
    ) {
      this.ngControl.valueAccessor = this;
     }

  ngOnInit(): void {
  } 

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }

  onReady($event: any) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader, this.serverUrl, this.apiUrl);
    };
  }

  editorConfig = {
    toolbar: {
      items: [
        'heading', '|',
        'fontfamily', 'fontsize', 'alignment', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'mediaEmbed', 'blockQuote', '|',
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
          this.textCharCount.emit(stats.characters);
          this.textWordCount.emit(stats.words);
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
    link: {
      decorators: {
          toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                  download: 'file'
              }
          },
          openInNewTab: {
              mode: 'manual',
              label: 'Open in a new tab',
              defaultValue: true,			// This option will be selected by default.
              attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer'
              }
          },
          addInternalLink: {
            mode: 'manual',
            label: 'Internal link',
            attributes: {
                tag: 'internalLink',
            }
          },
          addExternalLink: {
            mode: 'manual',
            label: 'External link',
            attributes: {
                tag: 'externalLink',
            }
          }
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
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:block', 'imageStyle:side',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative',
        '|',
        'toggleImageCaption',
        '|',
        'linkImage'
      ]
    },
    mediaEmbed: {

      // Previews are always enabled if there’s a provider for a URL (below regex catches all URLs)
      // By default `previewsInData` are disabled, but let’s set it to `false` explicitely to be sure
      previewsInData: false,

      providers: [
          {
              // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
              name: 'iframely previews', 

              // Match all URLs or just the ones you need:
              url: /.+/,

              html: (match: any) => {
                  const url = match[ 0 ];
                  
                  var iframeUrl = this.IFRAME_SRC + '?app=1&api_key=' + this.IFRAMELY_API_KEY + '&url=' + encodeURIComponent(url);
                  // alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
                  // more about it: https://iframely.com/docs/allow-origins

                  return (
                      // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
                      '<div class="iframely-embed">' +
                          '<div class="iframely-responsive">' +
                              `<iframe src="${ iframeUrl }" ` +
                                  'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                              '</iframe>' +
                          '</div>' +
                      '</div>'
                  );
                }
            }
        ]
    },

    language: 'en',
    placeholder: 'Type here..'
  };
}
