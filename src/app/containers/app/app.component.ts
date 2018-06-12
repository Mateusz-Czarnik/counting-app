import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ValidatorsService} from "../../services/validators/validators.service";

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
      <h1>Enter two whole numbers to calculate result</h1>
      <div class="wrapper">
          <div [formGroup]="form" class="form">
              <div class="input-wrapper">
                  <label class="">
                      <input
                        class=""
                        type="text"
                        placeholder="First number"
                        formControlName="firstNumber"
                      >
                  </label>
                  <div class="error" *ngIf="numberFormat('firstNumber')">
                      Must be numeric value
                  </div>
                  <div class="error" *ngIf="required('firstNumber')">
                      Field is required
                  </div>
              </div>
              <div class="input-wrapper">
                  <label class="">
                      <input
                        class=""
                        type="text"
                        placeholder="Second number"
                        formControlName="secondNumber"
                      >
                  </label>
                  <div class="error" *ngIf="numberFormat('secondNumber')">
                      Must be numeric value
                  </div>
                  <div class="error" *ngIf="required('secondNumber')">
                      Field is required
                  </div>
              </div>
              <hr>
              <h3>
                  Calculating formula: a + a * a - b + b * b
              </h3>
              <h3>
                  Result: {{ result }}
              </h3>
              <button (click)="handleCalculate()">Calculate</button>
          </div>
          <div
            *ngIf="result > 0 ; else message"
            class="list-wrapper"
          >
              <h1>
                  Listing <span>{{ currIdx }}</span> of <span>{{ result }}</span>
              </h1>
              <button
                *ngIf="listing"
                class="btn-stop"
                (click)="handleStop()"
              >Stop listing
              </button>
              <div class="indicies-list" #indicesList></div>
          </div>
          <ng-template #message>
              <h3 *ngIf="result < 0">
                  Cannot generate list of indexes
              </h3>
          </ng-template>
      </div>
  `
})
export class AppComponent {
  result: number;
  currIdx: number;
  indicesList: ElementRef;
  listing: boolean = false;

  form = this.fb.group({
    firstNumber: ['', [Validators.required, this.vs.isInteger]],
    secondNumber: ['', [Validators.required, this.vs.isInteger]],
  });

  @ViewChild('indicesList')
  set content(content: ElementRef) {
    this.indicesList = content;
  }

  constructor(private fb: FormBuilder,
              private vs: ValidatorsService) {
  }

  clearIndicesList() {
    if (this.indicesList) this.indicesList.nativeElement.innerHTML = ''
  }

  buildIndicesList(html: string) {
    if (this.indicesList) this.indicesList.nativeElement.innerHTML += html
  }

  handleCalculate() {
    if (this.form.valid && !this.listing) {
      let formVal = this.form.value;

      this.result = this.calculateFormula(parseInt(formVal.firstNumber), parseInt(formVal.secondNumber));
      this.generateList(this.result)
    }
  }

  handleStop() {
    this.listing = false
  }

  generateList(result: number) {
    this.clearIndicesList();
    this.listing = true;
    this.listIndices(0, result)
  }

  listIndices(currIdx, lastIdx) {
    if (this.listing) {
      setTimeout(() => {
        const index = currIdx;
        let string = '';

        for (let loopIndex = index; loopIndex < index + 100; loopIndex++) {
          if (loopIndex > lastIdx) break;
          string += loopIndex + "<br>";
          currIdx = loopIndex
        }

        if (currIdx < lastIdx) {
          currIdx++;
          this.listIndices(currIdx, lastIdx);
        } else {
          this.listing = false
        }

        this.buildIndicesList(string);
        this.currIdx = currIdx
      }, 50);
    }
  }

  calculateFormula(a: number, b: number) {
    return a + a * a - b + b * b;
  }

  // Form helpers
  numberFormat(controlName: string) {
    const control = this.form.get(controlName);

    return control.hasError('notNumeric') && control.touched
  }

  required(controlName: string) {
    const control = this.form.get(controlName);

    return control.hasError('required') && control.touched
  }
}
