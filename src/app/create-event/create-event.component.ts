import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BBEvent } from '../models/bbevent.model';
import { Person } from '../models/person.model';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';

import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  events: BBEvent[];
  eventForm: FormGroup;
  post: any = '';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Mathias Moen', 'Molly Bazilchuk', 'Fredrik Fyksen'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  showTime: string;
  onChangeRange(rangeValue: any) {
    this.showTime = rangeValue.value;
  }
  constructor(private fb: FormBuilder) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  /*   this.participants = [
      {
        name: 'Mathias Moen',
        streak: 0,
        apperances: 0
      },
      {
        name: 'Fredrik Fyksen',
        streak: 0,
        apperances: 0
      },
      {
        name: 'Molly Bazilchuk',
        streak: 0,
        apperances: 0
      }
    ]; */

    /* this.events = [
      {
        id: 1,
        date: '12.10.2018',
        pace: '5.22',
        participants: this.participants
      },
      {
        id: 2,
        date: '17.10.2018',
        pace: '5.37',
        participants: this.participants
      }
    ]; */
  }

  ngOnInit() {
    this.createForm();
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    const decimalPart = +value.toString().replace(/^[^\.]+/, '0');
    let mm = decimalPart * 60;
    mm = Math.round(mm);
    const mmPart = mm.toString().length === 1 ?  '0' + mm.toString() : mm.toString();

    if (value >= 0) {
      const valueStr = value.toFixed(2);
      const strArr = valueStr.split('.');
      if (strArr[0].length === 1) {
        strArr[0] = '0' + strArr[0];
      }
      var hhPart = strArr[0];
      console.log(strArr);
    }

    return hhPart + ':' + mmPart;
  }

  createForm() {
    this.eventForm = new FormGroup({
      date: new FormControl(),
      pace: new FormControl(),
      participants: new FormControl()
    });
  }


  onSubmit(post) {
    this.post = post;
  }
}
