import { Component, OnInit } from '@angular/core';
import { PersonFirebaseServiceProvider } from '../../services';
import { FirebaseCallbackModel, PersonModel } from '../../models';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  persons: PersonModel[] = [];

  constructor(private _snackBarService: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private personFirbaseService: PersonFirebaseServiceProvider) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.personFirbaseService.getAll((x) => this.getAllCallback(x));
  }

  getAllCallback(result: FirebaseCallbackModel) {
    if (result.success) {
      this.persons = result.data;
      return;
    }
    this._snackBarService.open('Error getting data', undefined, { duration: 3000 });

  }

  detailClick(record) {
    this._router.navigate(['/persons/' + record.guidId ]);

  }
}
