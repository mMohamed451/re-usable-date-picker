import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularMyDatePickerDirective,
  IAngularMyDpOptions,
} from 'angular-mydatepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements OnInit {
  @Input() fieldLabel!: string;
  @Input() clearLabel!: string;
  clearValue: boolean = false;
  myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    inline: true,
    dateFormat: 'dd.mm.yyyy',
  };

  myForm!: FormGroup;

  @ViewChild('dp') myDp!: AngularMyDatePickerDirective;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      myDate: [null, Validators.required],
    });
  }

  onSubmitReactiveForms(): void {
    this.myForm.controls['myDate'].value,
      ' - Valid: ',
      this.myForm.controls['myDate'].valid,
      ' - Dirty: ',
      this.myForm.controls['myDate'].dirty,
      ' - Touched: ',
      this.myForm.controls['myDate'].touched;
  }

  toggleCalendar(): void {
    this.cdr.detectChanges();
    this.myDp.toggleCalendar();
  }

  clearDate(): void {
    this.clearValue = true;
    this.myForm.setValue({ myDate: null });
  }

  onSelected($event: any): void {
    this.clearValue = false;
    console.log($event); // Selected Date.
  }
}
