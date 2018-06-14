import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PersonFirebaseServiceProvider } from '../../../services';
import { FirebaseCallbackModel, PersonModel } from '../../../models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  private subscriptions: any[] = [];
  private personId: string = '';
  frmPerson: FormGroup;
  personModel: PersonModel = new PersonModel();

  constructor(public builder: FormBuilder,
    private _snackBarService: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private locationService: Location,
    private _router: Router,
    private personFirbaseService: PersonFirebaseServiceProvider
  ) {
  }

  ngOnInit() {
    this.frmPerson = this.builder.group({
      'name': [{ value: '' }, Validators.required],
      'comment': [{ value: '' }, Validators.required]
    });

    this.frmPerson.reset();
    this.subscriptions.push(this._activatedRoute.params.subscribe((params) => {
      // tslint:disable-next-line:radix
      this.personId = '';
      if (params.id !== '0') {
        this.personId = params.id;
      }
      this.loadData();
    }));

  }

  loadData() {
    this.personFirbaseService.getRecord(this.personId, (x) => this.getRecordCallback(x));
  }

  getRecordCallback(result: FirebaseCallbackModel) {
    if (result.success) {
      this.personModel = result.data;
      this.frmPerson.reset(this.personModel);
      return;
    }
  }

  cancelClick() {
    this.locationService.back();
  }
  okClick() {

    if (this.personId === '') {
      this.personModel = {
        guidId: this.getNewId(),
        name: this.frmPerson.controls.name.value,
        comment: this.frmPerson.controls.comment.value,
        shareToken: ''
      };
      this.personFirbaseService.insertRecord(this.personModel, (e) => this.uploadCallback(e));
    } else {
      this.personModel = {
        guidId: this.personId,
        name: this.frmPerson.controls.name.value,
        comment: this.frmPerson.controls.comment.value,
        shareToken: ''
      };
      this.personFirbaseService.updateRecord(this.personModel, (e) => this.uploadCallback(e));
    }

    this.cancelClick();

  }
  uploadCallback(result: FirebaseCallbackModel) {
    if (result.success) {
      this._snackBarService.open('Person uploaded successfully', undefined, { duration: 3000 });
      return;
    }
    this._snackBarService.open('Error uploading person', undefined, { duration: 3000 });
    alert(JSON.stringify(result.data));
  }

  getNewId(): string {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
