import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { functionWords } from "./global-variables";

@Injectable({
    providedIn: 'root'
  })
export class CustomFieldValidators {
    // Custom validators
    focusKeyPhraseValidation(keyPhraseContentWords: string[]): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {

        var focusKeyPhrase = control.value;
        var splitted: string[] = focusKeyPhrase.split(" ");
  
        // Remove last item, if length is zero
        splitted = splitted.filter(item => item.length !== 0);
        
        // Remove function words
        splitted = splitted.filter(item => !functionWords.includes(item.toLowerCase()));

        // Remove elements from array
        while(keyPhraseContentWords.length > 0) {
            keyPhraseContentWords.pop();
        }
        // Add the new elements to the array
        splitted.forEach(element => {
            if(!keyPhraseContentWords.includes(element)) {
                keyPhraseContentWords.push(element);
            }
        });
        
  
        return splitted.length > 3 && splitted.length < 7 ? null : {strongEnough: true};
      };
    }
}